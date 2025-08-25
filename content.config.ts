import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
    collections: {
        content: defineCollection({
            type: "page",
            source: "**/*.md",
        }),
        home: defineCollection({
            type: "page",
            source: "**/*.md",
            schema: z.object({
                articles: z.array(z.object({
                    title: z.string(),
                    description: z.string(),
                    link: z.string(),
                })),
            }),
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
        events: defineCollection({
            type: "page",
            source: "**/*.md",
            schema: z.object({
                events: z.array(z.object({
                    id: z.string(),
                    title: z.string(),
                    description: z.string(),
                    fullDescription: z.array(z.string()),
                    date: z.string(),
                    image: z.string(),
                })),
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
                    image: z.string().optional(),
                    description: z.string(),
                    subDescription: z.string().optional(),
                    list: z.array(z.string()).optional(),
                })),
            }),
        }),
        regionalCouncils: defineCollection({
            type: "page",
            source: "**/*.md",
            schema: z.object({
                councils: z.array(z.object({
                    name: z.string(),
                    email: z.string(),
                    address: z.string(),
                    phoneNumber: z.string().optional(),
                })),
            }),
        }),
    },
});
