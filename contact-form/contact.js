const container = document.querySelector('.container');
const successMsg = document.querySelector('.successMessage');


document.getElementById('contactForm').addEventListener('submit', (e) => {
    // Radio butonlarını seç
    const radios = document.querySelectorAll('input[type="radio"]');
    const aggrement = document.getElementById('aggrementCheckbox');
    let isChecked = false;

    radios.forEach(radio => {
        if (radio.checked) {
            isChecked = true;
        }
    });

    if (!isChecked) {
        e.preventDefault();
        document.querySelector('.errorMsg').style.display = 'block';
    } else {
        document.querySelector('.errorMsg').style.display = 'none';
    }

    if (!aggrement.checked) {
        e.preventDefault();
        document.querySelector('.aggrementError').style.display = 'block';
    } else {
        e.preventDefault();
        document.querySelector('.aggrementError').style.display = 'none';
        container.style.display = 'none';
        successMsg.style.display = 'block';

        document.querySelector('.successCloseBtn').addEventListener('click', () => {
            successMsg.style.display = 'none';
            container.style.display = 'block';

            // Formu sıfırla
            document.getElementById('contactForm').reset();
        });
    }
});
