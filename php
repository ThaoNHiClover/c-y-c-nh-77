<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $fullname = htmlspecialchars($_POST["fullname"]);
  $phone    = htmlspecialchars($_POST["phone"]);
  $product  = htmlspecialchars($_POST["product"]);
  $note     = htmlspecialchars($_POST["note"]);

  // Lưu vào file (cách đơn giản nhất)
  $content = "Tên: $fullname | SĐT: $phone | Cây: $product | Ghi chú: $note\n";
  file_put_contents("donhang.txt", $content, FILE_APPEND);

  echo "Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm 🌱";
}
?>
