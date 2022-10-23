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

public class clientSelectTest {
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

    driver.get("file:///Users/maithanhnguyen/Desktop/cs32/term-project-asridh13-easis-jdavis70-mn24-namhaz-oabdelha/karakaremaster/frontend/landing/Pages/clientSelect.html");
  }

  @AfterClass
  public static void quitSelenium() {
    driver.quit();
    System.out.println("Ending selenium UI tests");
  }

  /**
   * Testing that the buttons are correct
   */
  @Test
  public void testButtons() {
    WebElement residentButton = driver.findElement(By.id("residentButton"));
    assertEquals("I AM A RESIDENT", residentButton.getText());

    WebElement managerButton = driver.findElement(By.id("managerButton"));
    assertEquals("I AM A MANAGER", managerButton.getText());
  }
}

