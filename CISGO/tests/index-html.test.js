import { render, fireEvent } from "@testing-library/dom";

describe("amChart bullet click event", () => {
  test("should show alert when bullet is clicked", () => {
    const bullet = pointSeries.bullets[0]();
    render(bullet.sprite);
    fireEvent.click(bullet.sprite);
    expect(alert).toHaveBeenCalledTimes(1);
    expect(alert).toHaveBeenCalledWith("Clicked on New York");
  });
});
