import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
    collections: {
        content: defineCollection({
            type: "page",
            source: "**/*.md",
            schema: z.object({}),
        }),
        missionVisionAndValues: defineCollection({
            type: "page",
            source: "**/*.md",
            schema: z.object({
                coreValues: z.array(z.string()),
            }),
        }),
        about: defineCollection({
            type: "page",
            source: "**/*.md",
            schema: z.object({
                roles: z.object({
                    title: z.string(),
                    items: z.array(z.string()),
                }).optional(),
                coreValues: z.object({
                    title: z.string().optional(),
                    description: z.string().optional(),
                    values: z.array(z.string()),
                }).optional(),
            }),
        }),
        governingBody: defineCollection({
            type: "page",
            source: "**/*.md",
            schema: z.object({
                members: z.array(z.object({
                    id: z.string(),
                    name: z.string(),
                    role: z.string(),
                    imageUrl: z.string().optional(),
                    description: z.string(),
                    subDescription: z.string().optional(),
                    list: z.array(z.string()).optional(),
                })),
            }),
        }),
    },
});
