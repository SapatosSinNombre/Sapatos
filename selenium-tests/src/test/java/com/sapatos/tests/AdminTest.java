package com.sapatos.tests;

import org.junit.jupiter.api.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import java.time.Duration;

public class AdminTest {
    private WebDriver driver;

    @BeforeEach
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "C:/CCRHOM/chromedriver-win64/chromedriver-win64/chromedriver.exe");
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }

   @Test
public void testAdminAccessAndNavigation() throws InterruptedException {
    driver.get("http://localhost:5173/");

    driver.findElement(By.id("username")).sendKeys("admin@prueba.com");
    driver.findElement(By.id("password")).sendKeys("123");
    driver.findElement(By.id("loginButton")).click();

    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));
    wait.until(ExpectedConditions.urlContains("/dashboard"));
    System.out.println("1.-Log in exitoso-Admin");

    WebElement homePage = wait.until(ExpectedConditions.presenceOfElementLocated(By.id("homeAdminPage")));
    Assertions.assertTrue(homePage.isDisplayed());
    Thread.sleep(1000);

    WebElement inventarioBtn = wait.until(ExpectedConditions.elementToBeClickable(By.id("sidebarButton-inventario")));
    inventarioBtn.click();
    System.out.println("2.-Boton inventario exitoso-Admin");

    WebElement inventarioPage = wait.until(ExpectedConditions.presenceOfElementLocated(By.id("inventarioAdmin")));
    Assertions.assertTrue(inventarioPage.isDisplayed());
    Thread.sleep(1000);

    WebElement dashboardBtn = wait.until(ExpectedConditions.elementToBeClickable(By.id("sidebarButton-dashboard")));
    dashboardBtn.click();
    System.out.println("3.-Boton dasboard exitoso-Admin");

    WebElement homeAgain = wait.until(ExpectedConditions.presenceOfElementLocated(By.id("homeAdminPage")));
    Assertions.assertTrue(homeAgain.isDisplayed());
    Thread.sleep(1000);

    WebElement collapseBtn = wait.until(ExpectedConditions.elementToBeClickable(By.id("botonrayas")));
    collapseBtn.click();
    Thread.sleep(1000);

    WebElement userMenuBtn = wait.until(ExpectedConditions.elementToBeClickable(By.id("userbutton")));
    userMenuBtn.click();
    System.out.println("4.-Boton usuario exitoso-Admin");
    Thread.sleep(1000);

    WebElement closeBtn = wait.until(ExpectedConditions.elementToBeClickable(By.id("tache")));
    closeBtn.click();
    System.out.println("5.-tache exitoso-Admin");
    Thread.sleep(1000);

    userMenuBtn.click();
    Thread.sleep(1000);

    WebElement perfilBtn = wait.until(ExpectedConditions.elementToBeClickable(By.id("userMenuProfile")));
    perfilBtn.click();
    System.out.println("6.-funciona el boton mi perfil no reedirige-Admin");
    Thread.sleep(1000);

    userMenuBtn = wait.until(ExpectedConditions.elementToBeClickable(By.id("userbutton")));
    userMenuBtn.click();
    System.out.println("7.-Boton usuario exitoso-Admin");
    Thread.sleep(1000);

    collapseBtn = wait.until(ExpectedConditions.elementToBeClickable(By.id("botonrayas")));
    collapseBtn.click();
    Thread.sleep(1000);

    userMenuBtn = wait.until(ExpectedConditions.elementToBeClickable(By.id("userbutton")));
    userMenuBtn.click();
    System.out.println("8.-Boton usuario exitoso-Admin");
    Thread.sleep(1000);

    closeBtn = wait.until(ExpectedConditions.elementToBeClickable(By.id("tache")));
    closeBtn.click();
    System.out.println("9.-tache exitoso-Admin");
    Thread.sleep(1000);

    userMenuBtn.click();
    Thread.sleep(1000);

    perfilBtn = wait.until(ExpectedConditions.elementToBeClickable(By.id("userMenuProfile")));
    perfilBtn.click();
    System.out.println("10.-funciona el boton mi perfil no reedirige-Admin");
    Thread.sleep(1000);

    userMenuBtn = wait.until(ExpectedConditions.elementToBeClickable(By.id("userbutton")));
    userMenuBtn.click();
    System.out.println("11.-Boton usuario exitoso-Admin");
    Thread.sleep(1000);

    WebElement logoutBtn = wait.until(ExpectedConditions.elementToBeClickable(By.id("logoutButton")));
    logoutBtn.click();
    Thread.sleep(1000);

    wait.until(ExpectedConditions.urlToBe("http://localhost:5173/"));
    System.out.println("12.-Sesion cerrada correctamente-Admin");
}



    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
