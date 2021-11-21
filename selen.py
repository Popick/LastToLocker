from selenium import webdriver
import requests

tableData = ""


def get_table():
    try:

        firefox_options = webdriver.FirefoxOptions()
        firefox_options.add_argument("--headless")
        firefox_options.add_argument("--disable-gpu")
        driver = webdriver.Firefox(options=firefox_options)

        # chrome_options = webdriver.ChromeOptions()
        # chrome_options.add_argument("--headless")
        # chrome_options.add_argument("--disable-gpu")
        # driver = webdriver.Chrome(options=chrome_options)

        driver.get("https://berseva.iscool.co.il/default.aspx")

        button = driver.find_element_by_xpath('//*[@id="dnn_ctr689_TimeTableView_ClassesList"]')
        button.click()

        button = driver.find_element_by_xpath('//*[@id="dnn_ctr689_TimeTableView_ClassesList"]/option[33]')
        button.click()

        button = driver.find_element_by_xpath('//*[@id="dnn_ctr689_TimeTableView_btnChangesTable"]')
        button.click()

        table = driver.find_element_by_xpath(
            '/html/body/form/div[3]/table/tbody/tr/td/table/tbody/tr[3]/td/table[1]/tbody/tr/td/table/tbody/tr[2]/td/div/div/div[1]/div/table')

        returnArguments = table.get_attribute('innerHTML')

        driver.close()

        return returnArguments



    except Exception as e:
        return e


# def write_to_file(data):
#     f = open("table.txt", "w", encoding="utf8")
#     f.write(data)
#     f.close()


def send_to_server(data):
    x = requests.post('http://localhost/receive', {"table": data})
    print(x.text)


if __name__ == '__main__':
    # write_to_file(get_table())
    # print("done!")
    send_to_server(get_table())
