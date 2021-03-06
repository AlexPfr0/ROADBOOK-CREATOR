<?php

// Script PHP permettant de générer le PDF
// Fait appel à la classe HTML2PDF
ini_set('display_errors',1);
//
$nom_roadbook   = filter_input(INPUT_POST, 'NOM_ROADBOOK');
$html_brut = filter_input(INPUT_POST, 'HTML_BRUT');

if(filter_input(INPUT_COOKIE, '_RBC_ColonneUnique') === 'oui'){
    $css = file_get_contents('./pdf/pdfDefaultCss_1Col.css');
} else if (filter_input(INPUT_COOKIE, '_RBC_ColonneUnique') === 'non') {
    $css = file_get_contents('./pdf/pdfDefaultCss.css');
}

$cssUser        = filter_input(INPUT_POST, 'CSS_PERSO'); //file_get_contents('./pdf/pdfUserCss.css');
 
ob_start(); 
echo '<style>';
echo $css;
echo $cssUser;
echo '</style>';
echo $html_brut;

$roadbook = ob_get_clean();
ob_end_clean();

use Spipu\Html2Pdf\Html2Pdf;
use Spipu\Html2Pdf\Exception\Html2PdfException;
use Spipu\Html2Pdf\Exception\ExceptionFormatter;
require_once("html2pdf/html2pdf-master/src/Html2Pdf.php");
try {

    $pdf = new Html2Pdf('P','A4','fr',true,"UTF-8",array(10, 10, 10, 10));

$pdf->pdf->SetTitle($nom_roadbook);
$pdf->pdf->SetAuthor("Alex P.");

$pdf->writeHTML($roadbook);
$pdf->output($nom_roadbook . '.pdf');

} catch (ImageException $e) {
  //  $pdf->clean();
    echo 'erreur : ' . $e;
}

?>

 

