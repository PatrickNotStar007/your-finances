export const openModal = (modalId: string) => {
    const modal = document.getElementById(modalId) as HTMLDialogElement
    modal?.showModal()
}

export const closeModal = (modalId: string) => {
    const modal = document.getElementById(modalId) as HTMLDialogElement
    modal?.close()
}
