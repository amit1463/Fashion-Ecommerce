import React from "react";
import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Filters from "./index";
import { DEFAULT_FILTERS, type FiltersState } from "./types";

// jsdom doesn't ship ResizeObserver / hasPointerCapture; Radix primitives
// (Accordion, Slider) need both to mount.
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

const setup = (initial: FiltersState = DEFAULT_FILTERS) => {
  let filters = initial;
  const onChange = vi.fn((next: FiltersState) => {
    filters = next;
  });
  const onApply = vi.fn();
  const utils = render(
    <Filters filters={filters} onChange={onChange} onApply={onApply} />
  );

  // Re-render the component when the parent's onChange would update state.
  const rerenderWithLatest = () =>
    utils.rerender(
      <Filters filters={filters} onChange={onChange} onApply={onApply} />
    );

  return { onChange, onApply, getFilters: () => filters, rerenderWithLatest };
};

describe("Filters", () => {
  it("renders the panel heading and every section header", () => {
    setup();

    expect(screen.getByRole("heading", { name: /filters/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /price/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /colors/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^size$/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /dress style/i })
    ).toBeInTheDocument();
  });

  it("calls onChange with the chosen category when a category link is clicked", async () => {
    const user = userEvent.setup();
    const { onChange } = setup();

    await user.click(screen.getByRole("link", { name: /jeans/i }));

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ category: "Jeans" })
    );
  });

  it("toggles a color when its swatch is clicked", async () => {
    const user = userEvent.setup();
    const { onChange } = setup();

    await user.click(screen.getByRole("button", { name: /^black$/i }));

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ colors: ["#000000"] })
    );
  });

  it("removes an already-selected color when its swatch is clicked again", async () => {
    const user = userEvent.setup();
    const { onChange } = setup({
      ...DEFAULT_FILTERS,
      colors: ["#000000"],
    });

    await user.click(screen.getByRole("button", { name: /^black$/i }));

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ colors: [] })
    );
  });

  it("toggles a size chip", async () => {
    const user = userEvent.setup();
    const { onChange } = setup();

    await user.click(screen.getByRole("button", { name: /^medium$/i }));

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ sizes: ["Medium"] })
    );
  });

  it("calls onChange with the chosen dress style", async () => {
    const user = userEvent.setup();
    const { onChange } = setup();

    await user.click(screen.getByRole("link", { name: /^formal$/i }));

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ style: "Formal" })
    );
  });

  it("invokes onApply when the Apply Filter button is clicked", async () => {
    const user = userEvent.setup();
    const { onApply } = setup();

    await user.click(screen.getByRole("button", { name: /apply filter/i }));

    expect(onApply).toHaveBeenCalledTimes(1);
  });

  it("resets every section to the defaults when the Clear filters button is clicked", async () => {
    const user = userEvent.setup();
    const { onChange } = setup({
      category: "T-shirts",
      priceRange: [25, 75],
      colors: ["#000000", "#FFFFFF"],
      sizes: ["Small"],
      style: "Casual",
    });

    await user.click(screen.getByRole("button", { name: /clear all filters/i }));

    expect(onChange).toHaveBeenCalledWith(DEFAULT_FILTERS);
  });
});
