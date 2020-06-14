<?php
ini_set('display_errors',1);
//
$nom_roadbook = $_POST['NOM_ROADBOOK'];
$html_brut = $_POST['HTML_BRUT'];
$css = file_get_contents('./pdf/pdfDefaultCss.css');
$cssUser = $_POST['CSS_PERSO']; //file_get_contents('./pdf/pdfUserCss.css');
 
ob_start(); 
echo '<style>';
echo $css;
echo $cssUser;
echo '</style>';
echo $html_brut;

$roadbook = ob_get_clean();

    
use Spipu\Html2Pdf\Html2Pdf;
use Spipu\Html2Pdf\Exception\Html2PdfException;
use Spipu\Html2Pdf\Exception\ExceptionFormatter;
require_once("html2pdf/html2pdf-master/src/Html2Pdf.php");
try{
    

$pdf = new Html2Pdf('P','A4','fr',true,"UTF-8",array(10, 10, 10, 10));
//$fontname = $pdf->addfont('BaiJamjuree-Regular','/html2pdf/fonts/BaiJamjuree-Regular.ttf', 'TrueTypeUnicode', '', 96);
//$fontname = $pdf->addfont('BaiJamjuree-Regular','','BaiJamjuree-Regular.ttf');
//$pdf->SetFont($fontname, '', 14, '', false);

//$pdf->setDefaultFont('Baijamjuree');
$pdf->writeHTML($roadbook);
$pdf->output($nom_roadbook . '.pdf');

} catch (ImageException $e) {
  //  $pdf->clean();
    echo $e;
   
    
}

//require './html2pdf/Html2Pdf.php';
//

  
 
?>

 

