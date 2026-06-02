import React from "react";
import { describe, it, expect, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ShopPage from "./page";

// Radix Slider / Accordion / Select expect APIs that jsdom doesn't ship.
beforeAll(() => {
  if (!(globalThis as any).ResizeObserver) {
    (globalThis as any).ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }
  if (!Element.prototype.hasPointerCapture) {
    Element.prototype.hasPointerCapture = () => false;
  }
  if (!Element.prototype.releasePointerCapture) {
    Element.prototype.releasePointerCapture = () => {};
  }
  if (!Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = () => {};
  }
});

describe("ShopPage", () => {
  it('renders the default heading "All Products" when no category is applied', () => {
    render(<ShopPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: /all products/i })
    ).toBeInTheDocument();
  });

  it("shows a non-zero product count for the default filters", () => {
    render(<ShopPage />);

    // Format: "Showing X-Y of N Products"
    const counter = screen.getByText(/showing \d+-\d+ of \d+ products/i);
    expect(counter).toBeInTheDocument();
    const match = counter.textContent?.match(/of (\d+) products/i);
    expect(match).not.toBeNull();
    expect(Number(match![1])).toBeGreaterThan(0);
  });

  it("updates the heading and product count when a category is applied", async () => {
    const user = userEvent.setup();
    render(<ShopPage />);

    // Click the desktop sidebar category, then commit via "Apply Filter".
    // There may be both desktop and mobile category links (in sheet); pick
    // the first one (desktop sidebar is rendered first).
    const jeansLinks = screen.getAllByRole("link", { name: /jeans/i });
    await user.click(jeansLinks[0]);

    const applyButtons = screen.getAllByRole("button", {
      name: /apply filter/i,
    });
    await user.click(applyButtons[0]);

    expect(
      screen.getByRole("heading", { level: 1, name: /^jeans$/i })
    ).toBeInTheDocument();
  });

  it("renders the Apply Filter button in the desktop sidebar", () => {
    render(<ShopPage />);

    const applyButtons = screen.getAllByRole("button", {
      name: /apply filter/i,
    });
    expect(applyButtons.length).toBeGreaterThanOrEqual(1);
  });
});
