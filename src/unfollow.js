// Kullanıcı Ayarları
var totalUnfollowTarget = 500; // Toplam çıkarılacak kişi sayısı
var actionDelayTime = 10000; // Her işlem arasında bekleme süresi (ms) - 10 saniye

// Takipten çıkarılan kişi sayısını takip etmek için sayaç
let currentUnfollowCount = 0;

// Takipten çıkarma işlemini başlatan fonksiyon
const startUnfollowProcess = () => {
    // Sayfada bulunan butonları seç ("Takiptesin" metnini içeren butonları bulmak için)
    const potentialUnfollowButtons = document.querySelectorAll('button._acan');

    // Her bir butonu sırayla kontrol et
    for (const unfollowButton of potentialUnfollowButtons) {
        // Butonun iç metni "Takiptesin" mi kontrol et
        const buttonTextContent = unfollowButton.querySelector('._ap3a')?.innerText;
        if (buttonTextContent === 'Takiptesin') {
            unfollowButton.click(); // "Takiptesin" butonuna tıkla
            setTimeout(() => {
                // Onay penceresindeki "Takipten Çık" butonunu seç
                const confirmDialogButton = document.querySelector('button._a9--._a9-_');
                if (confirmDialogButton) {
                    confirmDialogButton.click(); // Onay butonuna tıkla
                    currentUnfollowCount++; // Sayaç artır
                    console.log(`Çıkarılan kişi sayısı: ${currentUnfollowCount}`);

                    // Hedeflenen kişi sayısına ulaşılmadıysa işlemi devam ettir
                    if (currentUnfollowCount < totalUnfollowTarget) {
                        setTimeout(startUnfollowProcess, actionDelayTime); // Bir sonraki işlem için bekle ve devam et
                    } else {
                        // İşlem tamamlandığında mesaj yazdır
                        console.log(`${totalUnfollowTarget} kişi başarıyla takipten çıkarıldı!`);
                    }
                }
            }, 1000); // Onay penceresi için kısa bir bekleme süresi
            break; // Döngüyü kır ve bir sonraki işlem için beklemeye geç
        }
    }
};

// İşlemi başlatmak için fonksiyonu çağır
startUnfollowProcess();
