<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page contentType="text/html;charset=windows-1252"%>
<%@ page import="tab.*"%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=windows-1252"/>
    </head>
    <body>
    <%
   // assetRequest.jsp?from=icon
        try {
        email tab = new email( "Technology Asset Bank Request",request.getParameter("body"),request.getParameter("from"),"to address pulled from property file");
        tab.sendMail();
        }
        catch (Exception e) {
         out.println("<font class=\"contactusbodyText\">Not all parameters were set properly on the page.<br><br></font>");
        }
     %>
     Email Sent
    </body>
</html>