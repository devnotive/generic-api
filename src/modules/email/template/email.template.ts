export const sendMail = (
  token: string,
  link: string,
  fullName: string,
) => `<!doctype html>
<html lang="en" dir="auto" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<title></title>
<!--[if !mso]><!-->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!--<![endif]-->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style type="text/css">

#outlook a{padding:0;}body{margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}table,td{border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;}img{border:0;height:auto;line-height:100%;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;}p{display:block;margin:0;}
</style>
<!--[if mso]> <noscript><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
<![endif]-->
<!--[if lte mso 11]>
<style type="text/css">

.y{width:100% !important;}
</style>
<![endif]-->
<!--[if !mso]><!-->
<link href="https://fonts.googleapis.com/css?family=DM Sans:700,400" rel="stylesheet" type="text/css">
<link href="https://fonts.googleapis.com/css?family=Inter:400" rel="stylesheet" type="text/css">
<!--<![endif]-->
<style type="text/css">

@media only screen and (min-width:599px){.h{width:536px!important;max-width:536px;}.m{width:568px!important;max-width:568px;}}
</style>
<style media="screen and (min-width:599px)">.moz-text-html .h{width:536px!important;max-width:536px;}.moz-text-html .m{width:568px!important;max-width:568px;}
</style>
<style type="text/css">

u+.emailify .gs{background:#000;mix-blend-mode:screen;display:inline-block;padding:0;margin:0;}u+.emailify .gd{background:#000;mix-blend-mode:difference;display:inline-block;padding:0;margin:0;}p{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important;}u+.emailify a{color:inherit!important;text-decoration:none!important;}#MessageViewBody a{color:inherit!important;text-decoration:none!important;}
@media only screen and (max-width:599px){.emailify{height:100%!important;margin:0!important;padding:0!important;width:100%!important;}u+.emailify .glist{margin-left:1em!important;}td.x{padding-left:0!important;padding-right:0!important;}div.r.e>table>tbody>tr>td,div.r.e>div>table>tbody>tr>td{padding-right:16px!important}div.r.ys>table>tbody>tr>td,div.r.ys>div>table>tbody>tr>td{padding-left:16px!important}td.b.xb>table{width:100%!important}td.xb>table>tbody>tr>td>a{display:block!important;width:100%!important;padding-left:0!important;padding-right:0!important;}td.b.xb>table{width:100%!important}td.xb>table>tbody>tr>td{width:100%!important;padding-left:0!important;padding-right:0!important;}}
</style>
<meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<!--[if gte mso 9]>
<style>a:link{mso-style-priority:99;color:inherit;text-decoration:none;}a:visited{mso-style-priority:99;color:inherit;text-decoration:none;}li{text-indent:-1em;}table,td,p,div,span,ul,ol,li,a{mso-hyphenate:none;}sup,sub{font-size: 100% !important;}
</style>
<![endif]-->
<!--[if mso]>
<style>.c{background: transparent !important; background-color: transparent !important; mso-padding-alt: 0px; !important; padding: 0px !important; border: 0px !important; border-top: 0px !important; border-right: 0px !important; border-bottom: 0px !important; border-left: 0px !important;}
</style>
<![endif]-->
</head>
<body lang="en" link="#DD0000" vlink="#DD0000" class="emailify" style="mso-line-height-rule:exactly;mso-hyphenate:none;word-spacing:normal;background-color:#1e1e1e;"><div style="background-color:#1e1e1e;" lang="en" dir="auto">
<!--[if mso | IE]>
<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;" width="600"><tr><td style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
<![endif]--><div class="r e ys" style="background:#fffffe;background-color:#fffffe;margin:0px auto;max-width:600px;">
<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fffffe;background-color:#fffffe;width:100%;"><tbody><tr><td style="border:none;direction:ltr;font-size:0;padding:20px 16px 12px 16px;text-align:center;">
<!--[if mso | IE]>
<table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr></tr></table>
<![endif]-->
</td></tr></tbody></table></div>
<!--[if mso | IE]>
</td></tr></table>
<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;" width="600"><tr><td style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
<![endif]--><div class="r e ys" style="background:#fffffe;background-color:#fffffe;margin:0px auto;max-width:600px;">
<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fffffe;background-color:#fffffe;width:100%;"><tbody><tr><td style="border:none;direction:ltr;font-size:0;padding:42px 32px 12px 32px;text-align:left;">
<!--[if mso | IE]>
<table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:middle;width:536px;">
<![endif]--><div class="h y" style="font-size:0;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border:none;vertical-align:middle;" width="100%"><tbody><tr><td align="left" class="x" style="font-size:0;padding-bottom:24px;word-break:break-word;"><div style="text-align:left;"><p style="Margin:0;text-align:left;mso-line-height-alt:32px;mso-ansi-font-size:28px;"><span style="font-size:28px;font-family:'DM Sans','Arial',sans-serif;font-weight:700;color:#000000;line-height:114%;mso-line-height-alt:32px;mso-ansi-font-size:28px;">Admin Invitation</span></p></div>
</td></tr><tr><td align="left" class="x" style="font-size:0;padding-bottom:24px;word-break:break-word;"><div style="text-align:left;"><p style="Margin:0;text-align:left;mso-line-height-alt:24px;mso-ansi-font-size:16px;"><span style="font-size:16px;font-family:'DM Sans','Arial',sans-serif;font-weight:400;color:#868a90;line-height:150%;mso-line-height-alt:24px;mso-ansi-font-size:16px;">Hello,&nbsp;</span><span style="font-size:16px;font-family:'DM Sans','Arial',sans-serif;font-weight:400;color:#230a1e;line-height:150%;mso-line-height-alt:24px;mso-ansi-font-size:16px;">${fullName}</span></p></div>
</td></tr><tr><td align="left" class="x" style="font-size:0;padding-bottom:0;word-break:break-word;"><div style="text-align:left;"><p style="Margin:0;text-align:left;mso-line-height-alt:24px;mso-ansi-font-size:16px;"><span style="font-size:16px;font-family:'DM Sans','Arial',sans-serif;font-weight:400;color:#868a90;line-height:150%;mso-line-height-alt:24px;mso-ansi-font-size:16px;">We're delighted to inform you that an account has been created for you on GenericProject Admin Platform.
<br />
<br />
As an administrator, your role is pivotal in managing our platform and ensuring smooth operations.
<br />
<br />
To begin accessing your account, we kindly request you to proceed to the login page and follow the instructions to reset your password.
</span></p></div>
</td></tr></tbody></table></div>
<!--[if mso | IE]>
</td></tr></table>
<![endif]-->
</td></tr></tbody></table></div>
<!--[if mso | IE]>
</td></tr></table>
<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;" width="600"><tr><td style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
<![endif]--><div class="r e ys" style="background:#fffffe;background-color:#fffffe;margin:0px auto;max-width:600px;">
<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fffffe;background-color:#fffffe;width:100%;"><tbody><tr><td style="border:none;direction:ltr;font-size:0;padding:20px 16px 20px 16px;text-align:left;">
<!--[if mso | IE]>
<table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:middle;width:568px;">
<![endif]--><div class="m y" style="font-size:0;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border:none;vertical-align:middle;" width="100%"><tbody><tr><td align="center" class="b xb" style="font-size:0;padding:0;word-break:break-word;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;width:530px;line-height:100%;"><tbody><tr><td align="center" bgcolor="#ad3398" class="c" role="presentation" style="background:#ad3398;border:none;border-radius:8px 8px 8px 8px;cursor:auto;mso-padding-alt:16px 0px 16px 0px;" valign="middle">
<!--[if mso]><v:roundrect style="width:530px;height:49px;v-text-anchor:middle;" arcsize="33%" fill="t" stroke="f" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"><w:anchorlock/><v:fill type="solid" color="#ad3398"/><v:textbox inset="0,0,0,0"><center>
<![endif]--> <a href="${link}?token=${token}" class="c" style="display:inline-block;width:530px;background-color:#ad3398;color:#ffffff;font-family:'DM Sans','Arial',sans-serif;font-size:13px;font-weight:normal;line-height:100%;margin:0;text-decoration:none;text-transform:none;padding:16px 0px 16px 0px;mso-padding-alt:0;border-radius:8px 8px 8px 8px;" target="_blank"> <span style="font-size:14px;font-family:'DM Sans','Arial',sans-serif;font-weight:700;color:#ffffff;line-height:129%;mso-line-height-alt:18px;mso-ansi-font-size:14px;">Reset Password</span></a>
<!--[if mso]></center></v:textbox></v:roundrect>
<![endif]-->
</td></tr></tbody></table>
</td></tr></tbody></table></div>
<!--[if mso | IE]>
</td></tr></table>
<![endif]-->
</td></tr></tbody></table></div>
<!--[if mso | IE]>
</td></tr></table>
<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;" width="600"><tr><td style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
<![endif]--><div class="r e ys" style="background:#fffffe;background-color:#fffffe;margin:0px auto;max-width:600px;">
<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fffffe;background-color:#fffffe;width:100%;"><tbody><tr><td style="border:none;direction:ltr;font-size:0;padding:32px 32px 32px 32px;text-align:left;">
<!--[if mso | IE]>
<table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:middle;width:536px;">
<![endif]--><div class="h y" style="font-size:0;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border:none;vertical-align:middle;" width="100%"><tbody><tr><td align="left" class="x" style="font-size:0;word-break:break-word;"><div style="text-align:left;"><p style="Margin:0;text-align:left;mso-line-height-alt:30px;mso-ansi-font-size:16px;"><span style="font-size:16px;font-family:'Inter','Arial',sans-serif;font-weight:400;color:#777777;line-height:188%;mso-line-height-alt:30px;mso-ansi-font-size:16px;">
Thank you for being a part of GenericProject.<br />Warm Regards,</span></p><p style="Margin:0;mso-line-height-alt:30px;mso-ansi-font-size:16px;"><span style="font-size:16px;font-family:'Inter','Arial',sans-serif;font-weight:400;color:#777777;line-height:188%;mso-line-height-alt:30px;mso-ansi-font-size:16px;"><span style="font-size:16px;font-family:'Inter','Arial',sans-serif;font-weight:400;color:#ad3398;line-height:188%;mso-line-height-alt:30px;mso-ansi-font-size:16px;">Genericproject</span></span></p></div>
</td></tr></tbody></table></div>
<!--[if mso | IE]>
</td></tr></table>
<![endif]-->
</td></tr></tbody></table></div>
<!--[if mso | IE]>
</td></tr></table>
<![endif]--></div>
</body>
</html>
`;
