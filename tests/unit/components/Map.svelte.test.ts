import { render } from "@testing-library/svelte";
import { describe, expect, test, vi } from "vitest";
import Map from "../../../src/components/Map.svelte";
import { waitForOnMount } from "../utils";

const mockBounds = {
    min: { x: 0, y: 0 },
    max: { x: 100, y: 100 }
};

const mockMap = {
    setView: vi.fn().mockImplementation(() => mockMap),
    options: {
        minZoom: -1
    },
    getBounds: vi.fn().mockImplementation(() => mockBounds),
    setMaxBounds: vi.fn()
};

const mockTileLayer = {
    addTo: vi.fn()
};

const mockMapConstructor = vi.fn().mockImplementation(() => mockMap);
const mockTileLayerConstructor = vi.fn().mockImplementation(() => mockTileLayer);
const mockAddTo = vi.fn();
const mockControlZoom = vi.fn().mockImplementation(() => ({
	addTo: mockAddTo
}));

vi.doMock("leaflet", () => {
    return {
        map: mockMapConstructor,
        tileLayer: mockTileLayerConstructor,
			  control: {
					zoom: mockControlZoom
				}
    };
});

describe("Map", () => {
    test("initialises leaflet as expected", async () => {
        await render(Map);
        await waitForOnMount();

        expect(mockMapConstructor).toHaveBeenCalledWith("map", { maxBoundsViscosity: 1, zoomControl: false });
        expect(mockMap.setView).toHaveBeenCalled();
        expect(mockMap.setMaxBounds).toHaveBeenCalledWith(mockBounds);
        expect(mockTileLayerConstructor).toHaveBeenCalled();
        expect(mockTileLayer.addTo).toHaveBeenCalledWith(mockMap);
    });
});
