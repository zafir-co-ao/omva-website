import type { NavItem } from "../types/navItem";

export const navItems: NavItem[] = [
    { to: "/membership", label: "ADESÃO" },
    {
        label: "ÓRGÃOS DA ORDEM",
        subItems: [
            { to: "/congress", label: "Congresso" },
            { to: "/general-assembly", label: "Assembleia Geral" },
        ],
    },
    {
        label: "LEGISLAÇÃO",
        subItems: [
            { to: "/docs/estatutos-omva-2003.pdf", label: "Estatutos" },
        ],
    },
    {
        label: "SOBRE",
        subItems: [
            { to: "/about", label: "OMVA" },
            { to: "/about/history", label: "História" },
            { to: "/about/governing-body", label: "Corpo Directivo" },
        ],
    },
    {
        label: "EVENTOS",
        to: "/events",
    },
    { to: "/contacts", label: "CONTACTOS" },
];

export const otherItems: NavItem[] = [
    {
        to: "/about/mission-vision-and-values",
        label: "MISSÃO VISÃO E VALORES",
    },
];
