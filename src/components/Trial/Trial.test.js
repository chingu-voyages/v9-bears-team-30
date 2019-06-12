import React from "react"
import { render, cleanup } from "@testing-library/react"
import "jest-dom/extend-expect"

import Trial from "./Trial"

afterEach(cleanup)

describe("Trial", () => {
    it("renders", () => {
        const { asFragment } = render(<Trial text="Yo!"/>)
        expect(asFragment()).toMatchSnapshot()
    })

    it("should render with proper heading", () => {
        const { getByTestId } = render(<Trial text="Yo!"/>)
        const headingText = getByTestId("heading-text")
        // checks for exact string match
        expect(headingText.innerHTML).toEqual("This is a Test")
    })

    it("injects text into p", () => {
        const { getByTestId } = render(<Trial text="Yo!"/>)
        const injectText = getByTestId("inject-text")
        // checks for substring match 
        expect(injectText).toHaveTextContent("Yo")
    })
})

