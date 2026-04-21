const TransactionModal = () => {
    return (
        <>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Новая транзакция</h3>
                    <fieldset className="fieldset p-4">
                        {/* сумма */}
                        <label className="label">Сумма</label>
                        <div>
                            <input
                                type="number"
                                className="input validator"
                                required
                                placeholder="100"
                                min="1"
                                max="999999999"
                                title="Must be between be 1 to 10"
                            />
                            <p className="validator-hint">
                                Введите число от 1 до 999999999
                            </p>
                        </div>

                        {/* тип */}
                        <label className="label">Тип</label>
                        <div>
                            <select defaultValue="income" className="select">
                                <option>Доходы</option>
                                <option>Расходы</option>
                            </select>
                        </div>
                        <label className="label">Категория</label>
                        <div>
                            <input
                                type="text"
                                className="input validator"
                                required
                                placeholder="транспорт"
                                pattern="[A-Za-z][A-Za-z0-9\-]*"
                                minLength="3"
                                maxLength="30"
                                title="Only letters, numbers or dash"
                            />
                            <p className="validator-hint">
                                Введите от 3 до 30 символов
                                <br />
                                (только буквы, числа, тире)
                            </p>
                        </div>

                        {/* дата */}
                        <label className="label">Дата</label>
                        <input
                            type="date"
                            className="input validator"
                            required
                            placeholder="Pick a date in 2025"
                            min="2025-01-01"
                            max="2025-12-31"
                            title="Must be valid URL"
                        />

                        {/* описание */}
                        <label className="label">
                            Описание (необязательно)
                        </label>
                        <div>
                            <input
                                type="text"
                                className="input validator"
                                required
                                placeholder="транспорт"
                                pattern="[A-Za-z][A-Za-z0-9\-]*"
                                minLength="3"
                                maxLength="30"
                                title="Only letters, numbers or dash"
                            />
                            <p className="validator-hint">
                                Введите от 3 до 30 символов
                                <br />
                                (только буквы, числа, тире)
                            </p>
                        </div>
                        <button className="btn" type="submit">
                            Создать
                        </button>
                    </fieldset>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}

export default TransactionModal
