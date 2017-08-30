package view;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import model.JavaServiceFacade;

@WebListener
public class TabServiceListener implements ServletContextListener {
    private ServletContext context = null;

    public void contextInitialized(ServletContextEvent event) {
        context = event.getServletContext();

        System.out.println("TAB Initialized.");
    }

    public void contextDestroyed(ServletContextEvent event) {
        context = event.getServletContext();
//        JavaServiceFacade.cleanUp();
        System.out.println("TAB Destroyed.");
    }
}
