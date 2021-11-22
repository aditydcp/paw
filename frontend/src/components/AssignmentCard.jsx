const AssignmentCard = ({ ...props }) => {
    return (
        <span className="p-6 border-2 rounded-md bg-white" {...props}>
            <p className="font-bold">Mengembangkan REST API</p>
            <p className="mb-4">Due 23 Dec 2023</p>
            <p className="line-clamp-3">Dengan kelompok yang telah disusun sebelumnya, buat 2 fungsi CRUD. Buat repositori github dengan pola nama repositori paw-kelompok-1. Nama branch yang dikumpulkan bernama tugas-2.</p>
        </span>
    )
}

export default AssignmentCard