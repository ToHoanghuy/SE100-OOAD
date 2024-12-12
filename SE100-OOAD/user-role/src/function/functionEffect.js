import Swal from "sweetalert2";

export const getIconClass = (id) => {
    switch (id) {
        case 1:
            return 'fa-solid fa-wifi';
        case 2:
            return 'fa-solid fa-utensils';
        case 3:
            return 'fa-solid fa-bath fa-flip-horizontal';
        case 4:
            return 'fa-solid fa-water-ladder';
        case 5:
            return 'fa-solid fa-water';
        default:
            return ''; // Nếu không có id hợp lệ, trả về chuỗi rỗng
    }
};


export const toggleFavorite = (currentState, setState) => {
    const action = currentState ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích';
    const message = currentState
        ? 'Xóa địa điểm khỏi yêu thích thành công!'
        : 'Thêm địa điểm vào yêu thích thành công!';

    Swal.fire({
        title: action,
        text: message,
        icon: 'success',
        // confirmButtonText: 'Tiếp tục',
        timer: 1500, // Tự động đóng sau 2 giây
        showConfirmButton: false, // Ẩn nút xác nhận
        customClass: {
            confirmButton: 'custom_swal_button',
        },
    });

    setState(!currentState);
};