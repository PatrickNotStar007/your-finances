export const formatDateForInput = (date: Date | null | undefined): string => {
    if (!date) return ''
    return new Date(date).toISOString().split('T')[0]
}

export const openModal = (modalId: string) => {
    const modal = document.getElementById(modalId) as HTMLDialogElement
    modal?.showModal()
}

export const closeModal = (modalId: string) => {
    const modal = document.getElementById(modalId) as HTMLDialogElement
    modal?.close()
}
