import { utils, writeFile } from 'xlsx';

const generateOrderReport = (data, totalSales, totalOrders) => {
    const headers = ['Order ID', 'User ID', 'Product ID', 'Amount', 'Total', 'Status Pembayaran', 'Tanggal Order'];
    const summaryData = [['Total Sales', 'Total Orders'], [totalSales, totalOrders]];

    // Urutkan data berdasarkan tanggal created_at
    data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

    const wsData = [headers, ...data.map(item => [
        item.id,
        item.user_id,
        item.orderdetails
            .filter(detail => detail.product_id !== undefined && detail.amount !== undefined) // Filter nilai yang tidak valid
            .map(detail => detail.product_id)
            .join(', '), // Menggabungkan array menjadi satu string
        item.orderdetails
            .filter(detail => detail.product_id !== undefined && detail.amount !== undefined) // Filter nilai yang tidak valid
            .map(detail => detail.amount)
            .join(', '), // Menggabungkan array menjadi satu string
        item.total,
        item.status_pembayaran,
        item.created_at
    ])];
    const worksheet = utils.aoa_to_sheet(wsData);

    // Tambahkan summary data
    utils.sheet_add_aoa(worksheet, summaryData, { origin: 'A' + (wsData.length + 2) });

    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Sales Report');

    // Tulis file menggunakan writeFileSync
    writeFile(workbook, 'sales_report.xlsx', { bookType: 'xlsx', type: 'buffer' });
};

export default generateOrderReport;
