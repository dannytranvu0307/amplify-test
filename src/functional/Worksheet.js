import FormatDate from "./FormatDate"
export default function(workbook,user,exportOptions){
        const toDay = new Date();

        // Tính total tất cả record
        const handleTotalCost = () => {
            const total = exportOptions.reduce((i,next)=>{
                return parseInt(i) + parseInt(next.fee)
            },0)
            return total
        }
    
    
        // init style cho các cell
        const middle = { vertical: 'middle', horizontal: 'center' };
        const middle_left = { vertical: 'middle' , horizontal: 'left' };
    
        // init các cell có chung style về màu và border
        const cell_ = [
                    { position:"A3", header: '申請日'},
                    { position:"A4", header: '部署名' },
                    { position:"D4", header: '氏名' },
                    { position:"A6", header: '日付' },
                    { position:"B6", header: '訪問先' },
                    {  position:"C6", header: '交通機関' }, 
                    {  position:"D6", header: '出発地' },
                    {  position:"E6", header: '到着地' },
                    {  position:"F6", header: '片/往' }, 
                    {  position:"G6", header: '金額' },
                ];
    
        // init style cho border
        const thin = {style:'thin'}
        const border_cel = { top: thin, left: thin, bottom: thin, right: thin}

        const worksheet =  workbook.addWorksheet('交通費精算書', {
            pageSetup:{paperSize: 9, orientation:'landscape'}
        });
    
        // define column for sheet
        worksheet.columns = [
            { header: '日付', key: 'visitDate' ,width: 20},
            {  header: '訪問先', key: 'visitLocation',width: 30  },
            {  header: '交通機関', key: 'transportation' }, 
            {  header: '出発地', key: 'departure' },
            {  header: '到着地', key: 'destination' },
            {  header: '片/往', key: 'isRoundTrip' }, 
            {  header: '金額', key: 'fee' }
        ];
        
        // default merge column
        worksheet.mergeCells('A1', 'G1');
        worksheet.mergeCells('B3', 'C3');
        worksheet.mergeCells('B4', 'C4');
        worksheet.mergeCells('E4', 'G4'); 
        
        // header for sheet
        const HEADER_TITLE =  worksheet.getCell('A1');
        HEADER_TITLE.value = "交通費精算書";

        // header style
        HEADER_TITLE.alignment = middle
        HEADER_TITLE.font = {   bold: true, size: 15  };
    
        // add empty row
        worksheet.addRow([]);
       
        // Date cell
        const b3_cell = worksheet.getCell('B3')
        b3_cell.border = border_cel;      
        b3_cell.value = FormatDate(toDay,"YYYY年MM月DD日");
        b3_cell.alignment =middle_left;
    
        // deparment cell
        const b4_cell =  worksheet.getCell('B4')
        b4_cell.value = user.department
        b4_cell.border = border_cel;
        b4_cell.alignment = middle_left;
        
        // user name cell
        const e4_cell =  worksheet.getCell('E4')
        e4_cell.value = user.fullname
        e4_cell.border = border_cel;
        e4_cell.alignment =  middle_left;
    
        // add empty row
        worksheet.addRow([]);
        
        // tô màu, giá trị, style, border cho các ô cần
        cell_.map((key) => {
            worksheet.getCell(key.position).border = border_cel;
            worksheet.getCell(key.position).alignment = middle;
            worksheet.getCell(key.position).value = key.header
            worksheet.getCell(key.position).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'ffddebf7' },
                bgColor: { argb: 'ffddebf7' }
            }
        });
    
        // add item on row and style cell
        exportOptions.map(item=>{
            let row = worksheet.addRow(item);
            row.alignment = middle_left;
            row.eachCell({ includeEmpty: true }, function(cell) {
                worksheet.getCell(cell.address).border = border_cel;
            })
        });
    
        // Total row
        worksheet.mergeCells(`A${exportOptions.length + 7}`,`F${exportOptions.length + 7}`) //merge cells
    
        // cost title
        const cost_title = worksheet.getCell(`A${exportOptions.length + 7}`)
        cost_title.border = border_cel
        cost_title.value = "合計";
        cost_title.alignment = middle
    
        // cost
        const cost = worksheet.getCell(`G${exportOptions.length + 7}`);
        cost.value = handleTotalCost();
        cost.border = border_cel 
        cost.alignment = middle_left
    
        worksheet.eachRow({ includeEmpty: false }, function(row, rowNumber) {
           row.height = 29.2
        });
}