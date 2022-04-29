import html2canvas from "html2canvas"

const SaveReceipt = async () => {
    const element = document.getElementById('printImage')
    var ifrm = document.createElement('iframe');
    ifrm.setAttribute('id', 'ifrm'); // assign an id

    //document.body.appendChild(ifrm); // to place at end of document

    // to place before another page element
    var el = document.getElementById('marker');
    el.parentNode.insertBefore(ifrm, el);

    // assign url
    ifrm.setAttribute('src', 'demo.html');
    const canvas = await html2canvas(element)
    const data = canvas.toDataURL('image/jpg')
    return data
}

export default SaveReceipt