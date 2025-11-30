let qr;
let image;

function generateQR() {
    const url = document.getElementById('urlInput').value || 'https://gravatar.com/ballwictb';
    const size = document.getElementById('sizeInput').value;
    const fgColor = document.getElementById('fgColor').value;
    const bgColor = document.getElementById('bgColor').value;
    const imageInput = document.getElementById('imageInput').files[0];

    document.getElementById('sizeOutput').value = size;

    qr = new QRious({
        element: document.getElementById('qrCode'),
        value: url,
        size: parseInt(size),
        foreground: fgColor,
        background: bgColor
    });

    if (imageInput) {
        const reader = new FileReader();
        reader.onload = function (event) {
            image = new Image();
            image.src = event.target.result;
            image.onload = function () {
                drawImageOnQR();
            };
        };
        reader.readAsDataURL(imageInput);
    }
}

function drawImageOnQR() {
    const canvas = document.getElementById('qrCode');
    const context = canvas.getContext('2d');
    const imgSize = canvas.width * 0.2;
    const x = (canvas.width - imgSize) / 2;
    const y = (canvas.height - imgSize) / 2;

    context.beginPath();
    context.arc(x + imgSize / 2, y + imgSize / 2, imgSize / 2, 0, Math.PI * 2);
    context.clip();
    context.drawImage(image, x, y, imgSize, imgSize);
}

function downloadQR() {
    const canvas = document.getElementById('qrCode');
    const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const link = document.createElement('a');
    link.download = 'six-code.png';
    link.href = image;
    link.click();
}

function shareWhatsApp() {
    const url = document.getElementById('urlInput').value || 'https://gravatar.com/ballwictb';
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`;
    window.open(whatsappUrl, '_blank');
}

function shareDiscord() {
    const url = document.getElementById('urlInput').value || 'https://gravatar.com/ballwictb';
    alert('Para compartir en Discord, copia este enlace y pégalo en el chat de Discord:\n\n' + url);
}

generateQR();