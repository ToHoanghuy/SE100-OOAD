import Swal from "sweetalert2";

export const getIconClass = (name) => {
    switch (name) {
        case 'Dọn dẹp phòng':
            return 'fa-solid fa-broom';
        case 'Bữa sáng buffet':
            return 'fa-solid fa-utensils';
        case 'Xe đưa đón sân bay':
            return 'fa-solid fa-car-side';
        case 'Massage toàn thân':
            return 'fa-solid fa-hand-sparkles';
        case 'Dịch vụ giặt ủi':
            return 'fa-tshirt';
        case 'Thuê xe đạp':
            return 'fa-solid fa-bicycle';
        case 'Tour tham quan địa phương':
            return 'fa-solid fa-map-location-dot';
        case 'Dịch vụ ăn tối tại phòng':
            return 'fa-solid fa-bell-concierge';
        case 'Spa chăm sóc da':
            return 'fa-solid fa-spa';
        case 'Yoga buổi sáng':
            return 'fa-solid fa-om';
        default:
            return ''; // Nếu không có id hợp lệ, trả về chuỗi rỗng
    }
};
export const getFacilityIconClass = (name) => {
    switch (name) {
        case 'WiFi':
            return 'fa-solid fa-wifi';
        case 'Wifi miễn phí':
            return 'fa-solid fa-wifi';
        case 'Air Conditioning':
            return 'fa-solid fa-wind';
        case 'Máy lạnh':
            return 'fa-solid fa-wind';
        case 'Tủ lạnh':
            return 'fa-regular fa-snowflake';
        default:
            return ''; // Nếu không có id hợp lệ, trả về chuỗi rỗng
    }
};


export const toggleFavorite = (currentState, setState, event) => {
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }

    const action = currentState ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích';
    const message = currentState
        ? 'Xóa địa điểm khỏi yêu thích thành công!'
        : 'Thêm địa điểm vào yêu thích thành công!';

    Swal.fire({
        title: action,
        text: message,
        icon: 'success',
        // confirmButtonText: 'Tiếp tục',
        timer: 1300, // Tự động đóng sau 2 giây
        showConfirmButton: false, // Ẩn nút xác nhận
        customClass: {
            confirmButton: 'custom_swal_button',
        },
    });

    setState(!currentState);
};

export const formatRating = (rating) => {
    if (rating === 0) {
        return "0"; // Nếu rating là 0, trả về 0
    }
    if (Number.isInteger(rating)) {
        return `${rating}.0`; // Nếu là số nguyên, thêm .0
    }
    return rating;
};


export const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price);
};

export const  formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getDate()} tháng ${date.getMonth() + 1} năm ${date.getFullYear()}`;
}