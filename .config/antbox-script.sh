#!/usr/bin/bash

set -euo pipefail

ASPECTS_DIR=$(echo ".config/aspects/")
BANNERS_IMAGES_DIR=$(echo ".config/images/banners/")
EVENTS_IMAGES_DIR=$(echo ".config/images/events/")
GOVERNING_BODY_IMAGES_DIR=$(echo ".config/images/governing-body/")

SERVER="${1:-http://localhost:7180}"
TENANT="${2:-omva-website}"
PASSWORD="demo"

# Verifica se a palavra passe foi fornecida
if [ -z "${PASSWORD:-}" ]; then
    echo "Erro: A variável de ambiente [PASSWORD] não foi definida."
    exit 1
fi

# Gerar o hash SHA-256 da senha
SECRET=$(echo -n "$PASSWORD" | sha256sum | awk '{print $1}')

echo "Autenticando..."

# Fazendo a requisição de autenticação
RESPONSE=$(curl -s --fail --location "$SERVER/login/root" \
    -X POST \
    --header "X-Tenant: $TENANT" \
    --header "Content-Type: text/plain" \
    --data "$SECRET"
)

# Extrair o JWT do JSON usando jq
JWT=$(echo "$RESPONSE" | awk -F'"' '/jwt/ {print $4}')

if [ -z "$JWT" ] || [ "$JWT" == "null" ]; then
    echo "Erro: Token JWT não encontrado na resposta."
    exit 1
fi

echo "Autenticado com sucesso."

# Criar pasta
create_folder() {
    local folder_metadata="$1"
    FOLDER_DATA=$(
        curl -s --fail --location "$SERVER/nodes" \
            -X POST \
            --header "X-Tenant: $TENANT" \
            --header "Content-Type: application/json" \
            --header "X-Access-Token: $JWT" \
            --data "$folder_metadata"
    )
    local uuid=$(echo $FOLDER_DATA | awk -F'"' '{print $4}')
    echo "$uuid"
}

# Upload de Aspectos
echo "Fazendo upload dos aspectos..."
for aspect_file in "$ASPECTS_DIR"*.json; do
    if [ -f "$aspect_file" ]; then
        echo "Processando arquivo: $aspect_file"
        ASPECT_DATA=$(cat "$aspect_file")
        RESPONSE=$(
            curl -s --fail --location "$SERVER/aspects" \
                -X POST \
                --header "X-Tenant: $TENANT" \
                --header "Content-Type: application/json" \
                --header "X-Access-Token: $JWT" \
                --data "$ASPECT_DATA"
        )
        
        ASPECT_UUID=$(echo "$RESPONSE" | awk -F'"' '{print $4}')

        if [ -n "$ASPECT_UUID" ]; then
            echo "Aspecto criado com sucesso. UUID: $ASPECT_UUID"
        else
            echo "Erro ao criar aspecto para o arquivo: $aspect_file"
            exit 1
        fi

    else
        echo "Nenhum arquivo de aspecto encontrado em $ASPECTS_DIR"
        exit 1
    fi
done
echo "Upload dos aspectos concluído."

# Criar pastas para os banners
echo "Criando pastas para os banners..."
BANNERS_FOLDER_METADATA='{
    "parent": "--root--",
    "title": "'Banners'",
    "fid": "'banners'",
    "mimetype": "application/vnd.antbox.folder",
    "permissions": {
        "group": ["Read", "Write", "Export"],
        "authenticated": ["Read", "Export"],
        "anonymous": ["Read", "Export"]
    }
}'

BANNERS_FOLDER_UUID=$(create_folder "$BANNERS_FOLDER_METADATA")
echo "Pasta de banners criada com UUID: $BANNERS_FOLDER_UUID"

# Upload dos banners
echo "Fazendo upload dos banners..."
for image in $BANNERS_IMAGES_DIR*; do
    if [ -f "$image" ]; then
        image_name=$(basename "$image")
        image_mimetype=$(file -b --mime-type "$image")

        RESPONSE=$(
            curl -s --fail --location "$SERVER/upload/nodes" \
                -X POST \
                --header "Content-Type: multipart/form-data" \
                --header "X-Tenant: $TENANT" \
                --header "X-Access-Token: $JWT" \
                --form "file=@${image};type=${image_mimetype}" \
                --form 'metadata={
                "parent": "'"${BANNERS_FOLDER_UUID}"'",
                "title": "'"${image_name%.*}"'",
                "mimetype": "'"${image_mimetype}"'",
                "aspects": ["banner-image"],
                "properties": {
                    "banner-image:page": "'"${image_name%-*}"'"
                }
            };type=application/json'
        )

        BANNER_UUID=$(echo "$RESPONSE" | awk -F'"' '{print $4}')

        if [ -n "$BANNER_UUID" ]; then
            echo "Banner $image_name com uuid $BANNER_UUID enviado com sucesso."
        else
            echo "Erro ao enviar banner: ${image_name%.*}"
            exit 1
        fi

    else
        echo "Nenhum arquivo de banner encontrado em $BANNERS_IMAGES_DIR"
        exit 1
    fi
done
echo "Upload dos banners concluído."

# Criar pastas para os eventos
echo "Criando pastas para os eventos..."
EVENTS_FOLDER_METADATA='{
    "parent": "--root--",
    "title": "'Events'",
    "fid": "'events'",
    "mimetype": "application/vnd.antbox.folder",
    "permissions": {
        "group": ["Read", "Write", "Export"],
        "authenticated": ["Read", "Export"],
        "anonymous": ["Read", "Export"]
    }
}'

EVENTS_FOLDER_UUID=$(create_folder "$EVENTS_FOLDER_METADATA")
echo "Pasta de eventos criada com UUID: $EVENTS_FOLDER_UUID"

# Upload dos eventos
echo "Fazendo upload dos eventos..."
for image in $EVENTS_IMAGES_DIR*; do
    if [ -f "$image" ]; then
        image_name=$(basename "$image")
        image_mimetype=$(file -b --mime-type "$image")

       RESPONSE=$(
            curl -i -s --location "$SERVER/upload/nodes" \
            -X POST \
            --header "Content-Type: multipart/form-data" \
            --header "X-Tenant: $TENANT" \
            --header "X-Access-Token: $JWT" \
            --form "file=@$image;type=${image_mimetype}" \
            --form "metadata={
                \"parent\": \"${EVENTS_FOLDER_UUID}\",
                \"title\": \"${image_name%.*}\",
                \"mimetype\": \"${image_mimetype}\",
                \"aspects\": [\"event-uuid\"]
            };type=application/json"
        )
        
        EVENT_UUID=$(echo "$RESPONSE" | awk -F'"' '{print $4}')

        if [ -n "$EVENT_UUID" ]; then
            echo "Imagem ${image_name%.*} com uuid $EVENT_UUID enviada com sucesso."
        else
            echo "Erro ao enviar a imagem: ${image_name%.*}"
            exit 1
        fi

    else
        echo "Nenhum arquivo de evento encontrado em $EVENTS_IMAGES_DIR"
        exit 1
    fi
done
echo "Upload dos eventos concluído."

# Criar pastas para os membros do corpo directivo
echo "Criando pastas para os membros do corpo directivo..."
GOVERNING_BODY_FOLDER_METADATA='{
    "parent": "--root--",
    "title": "Governing Body",
    "fid": "governing-body",
    "mimetype": "application/vnd.antbox.folder",
    "permissions": {
        "group": ["Read", "Write", "Export"],
        "authenticated": ["Read", "Export"],
        "anonymous": ["Read", "Export"]
    }
}'

GOVERNING_BODY_FOLDER_UUID=$(create_folder "$GOVERNING_BODY_FOLDER_METADATA")
echo "Pasta do corpo directivo criada com UUID: $GOVERNING_BODY_FOLDER_UUID"

# Upload das imagens do corpo directivo
echo "Fazendo upload das imagens do corpo directivo..."
for image in $GOVERNING_BODY_IMAGES_DIR*; do
    if [ -f "$image" ]; then
        image_name=$(basename "$image")
        image_mimetype=$(file -b --mime-type "$image")

       RESPONSE=$(
            curl -i -s --location "$SERVER/upload/nodes" \
            -X POST \
            --header "Content-Type: multipart/form-data" \
            --header "X-Tenant: $TENANT" \
            --header "X-Access-Token: $JWT" \
            --form "file=@$image;type=${image_mimetype}" \
            --form "metadata={
                \"parent\": \"${GOVERNING_BODY_FOLDER_UUID}\",
                \"title\": \"${image_name%.*}\",
                \"mimetype\": \"${image_mimetype}\",
                \"aspects\": [\"member-uuid\"]
            };type=application/json"
        )
        
        MEMBER_UUID=$(echo "$RESPONSE" | awk -F'"' '{print $4}')

        if [ -n "$MEMBER_UUID" ]; then
            echo "Imagem $image_name com uuid $MEMBER_UUID enviada com sucesso."
        else
            echo "Erro ao enviar a imagem: ${image_name%.*}"
            exit 1
        fi

    else
        echo "Nenhum arquivo de membro do corpo directivo encontrado em $GOVERNING_BODY_IMAGES_DIR"
        exit 1
    fi
done
