import static org.junit.Assert.assertEquals;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import java.time.Duration;
import java.util.List;

public class landingTest {
    private static ChromeDriver driver;
    /**
     * Setting up automation of the UI tests for the given HTML file
     */
    @BeforeClass
    public static void automateTests() {
      // There will be various messages in the console...
      // (By default, Selenium prints a lot of info)
      WebDriverManager.chromedriver().setup();
      ChromeOptions options = new ChromeOptions();
      driver = new ChromeDriver(options);
      driver.manage().timeouts().implicitlyWait(Duration.ofMillis(500));

      driver.get("file:///Users/maithanhnguyen/Desktop/cs32/term-project-asridh13-easis-jdavis70-mn24-namhaz-oabdelha/karakaremaster/frontend/landing/landing.html");
    }

    @AfterClass
    public static void quitSelenium() {
      driver.quit();
      System.out.println("Ending selenium UI tests");
    }


    /**
     * Test to ensure that the first screen shows up correctly (the stylized loader screen)
     */
    @Test
    public void testStylizedLoader() {
      WebElement titles = driver.findElement(By.xpath("//div[@id='loader']"));
      List<WebElement> subelements = titles.findElements(By.xpath("./child::*"));

      assertEquals("\n" +
          "\t\t\t<p></p>\n" +
          "\t\t\t<p>Kara</p>\n" +
          "\t\t", subelements.get(0).getAttribute("innerHTML"));
      assertEquals("\n" +
          "\t\t\t<p>Kara</p>\n" +
          "\t\t\t<p>Kare</p>\n" +
          "\t\t", subelements.get(1).getAttribute("innerHTML"));
      assertEquals("\n" +
          "\t\t\t<a href=\"Pages/clientSelect.html\"> <p>Kare</p>\n" +
          "\t\t\t<p>Enter</p> </a>\n" +
          "\t\t", subelements.get(2).getAttribute("innerHTML"));

      WebElement loadButton = driver.findElement(By.id("loader"));
      loadButton.click();
      driver.manage().timeouts().implicitlyWait(Duration.ofMillis(500)); // waits
    }


}
