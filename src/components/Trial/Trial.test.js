import React from "react"
import { render, getByTestId } from "@testing-library/react"
import "jest-dom/extend-expect"

import Trial from "./Trial"

describe("Trial", () => {
    it("renders", () => {
        const { asFragment } = render(<Trial />)
        expect(asFragment()).toMatchSnapshot()
    })

    it("should render with proper heading", () => {
        const { container } = render(<Trial />)
        const headingText = getByTestId(container, "heading-text")
        expect(headingText.innerHTML).toEqual("This is a Test")
    })
})