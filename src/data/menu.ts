
export type Category = 'panini' | 'bevande' | 'dolci';

export type Product = {
    id: number;
    name: string;
    price: number;
    category: Category;
};

export const menu: Product[] = [
    {
        id: 1,
        name: 'Panino prosciutto e formaggio',
        price: 3,
        category: 'panini',
    },
    {
        id: 2,
        name: 'Piadina crudo e rucola',
        price: 3.5,
        category: 'panini',
    },
    {
        id: 3,
        name: 'Toast',
        price: 2.5,
        category: 'panini',
    },
    {
        id: 4,
        name: 'Acqua naturale',
        price: 1,
        category: 'bevande',
    },
    {
        id: 5,
        name: 'Succo di frutta',
        price: 1.5,
        category: 'bevande',
    },
    {
        id: 6,
        name: 'Caffè',
        price: 1.2,
        category: 'bevande',
    },
    {
        id: 7,
        name: 'Cornetto',
        price: 1.3,
        category: 'dolci',
    },
    {
        id: 8,
        name: 'Muffin al cioccolato',
        price: 2,
        category: 'dolci',
    },
    {
        id: 9,
        name: 'Ciambella',
        price: 1.5,
        category: 'dolci',
    }
]