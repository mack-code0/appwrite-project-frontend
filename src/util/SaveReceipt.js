    import html2canvas from "html2canvas"
    
    const SaveReceipt = async () =>{
        const element = document.getElementById('printImage')
        const canvas = await html2canvas(element)
        const data = canvas.toDataURL('image/jpg')
        return data
    }

    export default SaveReceipt