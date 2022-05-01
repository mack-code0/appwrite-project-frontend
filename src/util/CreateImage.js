    import html2canvas from "html2canvas"
    
    const CreateImage = async () =>{
        const element = document.getElementById('printImage')
        element.style.width = "fit-content"
        const canvas = await html2canvas(element)
        const data = canvas.toDataURL('image/jpg')
        return data
    }

    export default CreateImage