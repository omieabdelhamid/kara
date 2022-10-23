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

public class searchClothesTest {
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

    driver.get("file:///Users/maithanhnguyen/Desktop/cs32/term-project-asridh13-easis-jdavis70-mn24-namhaz-oabdelha/karakaremaster/frontend/landing/Pages/resident/searchClothes.html");
  }

  @AfterClass
  public static void quitSelenium() {
    driver.quit();
    System.out.println("Ending selenium UI tests");
  }

  /**
   * Test to ensure that various titles on the page are correct
   */
  @Test
  public void testSearchClothesTitles() {
    assertEquals("Search Clothes", driver.getTitle());
  }

  /**
   * Test to ensure that the article dropdown works properly and shows
   * the correct options
   */
  @Test
  public void testArticleDropdown() {
    WebElement dropdown = driver.findElement(By.id("typeClothes1"));
    List<WebElement> dropdownOptions = dropdown.findElements(By.tagName("option"));

    assertEquals("", dropdownOptions.get(0).getText());
    assertEquals("Shirt", dropdownOptions.get(1).getText());
    assertEquals("Shorts", dropdownOptions.get(2).getText());
    assertEquals("Pants", dropdownOptions.get(3).getText());
    assertEquals("Jacket", dropdownOptions.get(4).getText());
    assertEquals("Dress", dropdownOptions.get(5).getText());
    assertEquals("Scarf", dropdownOptions.get(6).getText());
    assertEquals("Coat", dropdownOptions.get(7).getText());
  }

  /**
   * Test to ensure that the color dropdown works properly and shows
   * the correct options
   */
  @Test
  public void testColorDropdown() {
    WebElement dropdown = driver.findElement(By.id("typeClothes2"));
    List<WebElement> dropdownOptions = dropdown.findElements(By.tagName("option"));

    assertEquals("", dropdownOptions.get(0).getText());
    assertEquals("White", dropdownOptions.get(1).getText());
    assertEquals("Black", dropdownOptions.get(2).getText());
    assertEquals("Red", dropdownOptions.get(3).getText());
    assertEquals("Purple", dropdownOptions.get(4).getText());
    assertEquals("Yellow", dropdownOptions.get(5).getText());
    assertEquals("Green", dropdownOptions.get(6).getText());
    assertEquals("Blue", dropdownOptions.get(7).getText());
    assertEquals("Grey", dropdownOptions.get(8).getText());
    assertEquals("Beige", dropdownOptions.get(9).getText());
    assertEquals("Pink", dropdownOptions.get(10).getText());
  }

  /**
   * Test to ensure that the size dropdown works properly and shows
   * the correct options
   */
  @Test
  public void testSizeDropdown() {
    WebElement dropdown = driver.findElement(By.id("typeClothes3"));
    List<WebElement> dropdownOptions = dropdown.findElements(By.tagName("option"));

    assertEquals("", dropdownOptions.get(0).getText());
    assertEquals("Small", dropdownOptions.get(1).getText());
    assertEquals("Medium", dropdownOptions.get(2).getText());
    assertEquals("Large", dropdownOptions.get(3).getText());
  }

  /**
   * Test to ensure that the table is filtered correctly
   * when options are selected by the dropdown
   */
  @Test
  public void testDropdownFilteringAndMenu() {
    WebElement articleDropdown = driver.findElement(By.id("typeClothes1"));
    WebElement colorDropdown = driver.findElement(By.id("typeClothes2"));
    WebElement sizeDropdown = driver.findElement(By.id("typeClothes3"));

    List<WebElement> articleOptions = articleDropdown.findElements(By.tagName("option"));
    List<WebElement> colorOptions = colorDropdown.findElements(By.tagName("option"));
    List<WebElement> sizeOptions = sizeDropdown.findElements(By.tagName("option"));

    articleDropdown.click();
    articleOptions.get(1).click();
    assertEquals(2, driver.findElements(By.xpath("//table/tbody/tr[not(contains(@style,'display: none;'))]")).size());

    colorDropdown.click();
    colorOptions.get(10).click();
    assertEquals(1, driver.findElements(By.xpath("//table/tbody/tr[not(contains(@style,'display: none;'))]")).size());

    sizeDropdown.click();
    sizeOptions.get(2).click();
    assertEquals(0, driver.findElements(By.xpath("//table/tbody/tr[not(contains(@style,'display: none;'))]")).size());

    articleDropdown.click();
    articleOptions.get(0).click();
    colorDropdown.click();
    colorOptions.get(0).click();
    sizeDropdown.click();
    sizeOptions.get(1).click();
    assertEquals(4, driver.findElements(By.xpath("//table/tbody/tr[not(contains(@style,'display: none;'))]")).size());

    // Testing that the menu shows up correctly
    WebElement menu = driver.findElement(By.className("menu-btn"));
    menu.click();
    assertEquals("Home", driver.findElement(By.id("homeButton")).getAttribute("innerHTML"));
    assertEquals("About", driver.findElement(By.id("aboutButton")).getAttribute("innerHTML"));
    assertEquals("Appointments", driver.findElement(By.id("appointmentsButton")).getAttribute("innerHTML"));
    assertEquals("Back", driver.findElement(By.id("backButton")).getAttribute("innerHTML"));
  }
}
