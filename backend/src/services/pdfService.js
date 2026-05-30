const PDFDocument = require("pdfkit");

exports.generateBookingPDF = (
  booking,
  res
) => {

  const doc =
    new PDFDocument();

  res.setHeader(
    "Content-Type",
    "application/pdf"
  );

  res.setHeader(
    "Content-Disposition",
    `inline; filename=booking-${booking.id}.pdf`
  );

  doc.pipe(res);

  // Título
  doc
    .fontSize(24)
    .text(
      "Renzo Garage",
      {
        align: "center",
      }
    );

  doc.moveDown(2);

  // Cliente
  doc
    .fontSize(14)
    .text(
      `Cliente: ${booking.customer_name}`
    );

  // Veículo
  doc.text(
    `Veículo: ${booking.brand} ${booking.model}`
  );

  doc.text(
    `Matrícula: ${booking.plate}`
  );

  doc.moveDown();

  // Serviço
  doc
    .fontSize(18)
    .text("Serviço");

  doc
    .fontSize(14)
    .text(booking.service);

  doc.moveDown();

  // Notas
  doc
    .fontSize(18)
    .text("Notas");

  doc
    .fontSize(14)
    .text(
      booking.notes || "-"
    );

  doc.moveDown();

    doc.moveDown();

doc
  .fontSize(18)
  .text("Valor");

doc
  .fontSize(16)
  .fillColor("green")
  .text(
    `${booking.service_price}€`
  );

doc.fillColor("black");

  // Estado
  doc.text(
    `Estado: ${booking.status}`
  );

  // Data
  doc.text(
    `Data: ${booking.booking_date}`
  );

  doc.moveDown(3);

  doc.text(
    "Obrigado pela preferência",
    {
      align: "center",
    }
  );

  doc.end();

  doc.moveDown();

  doc
    .fontSize(18)
    .text("Valor");

  doc
    .fontSize(16)
    .fillColor("green")
    .text(
      `${booking.service_price}€`
    );

  doc.fillColor("black");

};