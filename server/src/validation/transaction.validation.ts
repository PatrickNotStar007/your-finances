import { body, checkSchema } from 'express-validator'

export const transactionCreateValidate = checkSchema({
    amount: {
        exists: {
            errorMessage: 'Требуется ввести сумму',
            options: { checkFalsy: true },
        },
        isNumeric: {
            errorMessage: 'Сумма должна быть числом',
        },
        custom: {
            options: (v) => parseFloat(v) > 0,
            errorMessage: 'Сумма должна быть > 0',
        },
        toFloat: true,
    },
    type: {
        exists: {
            errorMessage: 'Укажите тип',
            options: { checkFalsy: true },
        },
        isIn: {
            options: [['income', 'expense']],
            errorMessage: 'Тип должен быть либо доходы, либо расходы',
        },
    },
    category: {
        exists: {
            errorMessage: 'Укажите категорию',
            options: { checkFalsy: true },
        },
        trim: true,
        notEmpty: {
            errorMessage: 'Категория не должна быть пустой',
        },
    },
    comment: {
        optional: true,
        isString: { errorMessage: 'Комментарий должен быть строкой' },
        trim: true,
    },
    date: {
        optional: true,
        isISO8601: { errorMessage: 'Формат даты должен быть ГГГГ-ММ-ДД' },
        toDate: true,
    },
})

export const transactionUpdateValidate = checkSchema({
    amount: {
        optional: true,
        isNumeric: {
            errorMessage: 'Сумма должна быть числом',
        },
        custom: {
            options: (v) => parseFloat(v) > 0,
            errorMessage: 'Сумма должна быть > 0',
        },
        toFloat: true,
    },
    type: {
        optional: true,
        isIn: {
            options: [['income', 'expense']],
            errorMessage: 'Тип должен быть либо доходы, либо расходы',
        },
    },
    category: {
        optional: true,
        trim: true,
        notEmpty: {
            errorMessage: 'Категория не должна быть пустой',
        },
    },
    comment: {
        optional: true,
        isString: { errorMessage: 'Комментарий должен быть строкой' },
        trim: true,
    },
    date: {
        optional: true,
        isISO8601: { errorMessage: 'Формат даты должен быть ГГГГ-ММ-ДД' },
        toDate: true,
    },
})
