import static org.junit.Assert.assertEquals;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;


import java.time.Duration;
import java.util.List;

public class residentLookUpTest {

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
        //    driver = new SafariDriver(options);
        driver.manage().timeouts().implicitlyWait(Duration.ofMillis(500));

        // Remember to CHANGE THIS if you want to run vs. a local file
        driver.get("file:///Users/maithanhnguyen/Desktop/cs32/term-project-asridh13-easis-jdavis70-mn24-namhaz-oabdelha/karakaremaster/frontend/landing/Pages/resident/residentLookUp.html");
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
    public void testTitles() {
        assertEquals("Resident Appointment Look Up", driver.getTitle());
    }

    /**
     * Test to ensure that the search bar shows up correctly
     */
    @Test
    public void testSearchBarFiltering() {
        WebElement searchBar = driver.findElement(By.id("search-bar"));
        // TO-DO: uncomment and update the correct number of rows once the database is finalized
//        assertEquals(5 , driver.findElements(By.xpath("//table/tbody/tr")).size());

        //typing in search bar and testing that the table is filtered correctly
        searchBar.sendKeys("Omar");
        assertEquals(1 , driver.findElements(By.xpath("//table/tbody/tr[not(contains(@style,'display: none;'))]")).size());

        //clearing search to test a new string
        searchBar.clear();
        searchBar.sendKeys("Amhaz");
        assertEquals(1 , driver.findElements(By.xpath("//table/tbody/tr[not(contains(@style,'display: none;'))]")).size());
    }

    /**
     * Testing that table row links to searchClothes page
     */
    @Test
    public void testClickableRow() {
        WebElement searchBar = driver.findElement(By.id("search-bar"));
        //typing in search bar and selecting
        searchBar.clear();
        searchBar.sendKeys("Omar");
        WebElement row = driver.findElement(By.xpath("//table/tbody/tr[not(contains(@style,'display: none;'))]"));
        assertEquals("Omar Abdelhamid 05/07/2022 12:00 PM Small Scarf Medium Shorts Large Shirt", row.getText());
        //Creating object of an Actions class
        Actions action = new Actions(driver);

        //Performing the mouse hover action on the target element.
        action.moveToElement(row).perform();
        System.out.println("row: " + row.getCssValue("background"));
        assertEquals("rgb(211, 211, 211) none repeat scroll 0% 0% / auto padding-box border-box",row.getCssValue("background"));
        searchBar.clear();
    }

}
