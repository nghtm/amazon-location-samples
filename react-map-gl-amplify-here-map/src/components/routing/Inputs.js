// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { useContext, useEffect, useState, useRef } from "react";
import { Hub } from "@aws-amplify/core";
import { AppContext } from "../../AppContext";
import useDebounce from "../../hooks/useDebounce";
import { Geo } from "@aws-amplify/geo";
import Button from "../primitives/Button";
import NavigationIcon from "../primitives/NavigateIcon";

// Helper function to format address
const formatAddress = ({
  label,
  street,
  addressNumber,
  postalCode,
  municipality,
  country,
}) => {
  if (label) {
    return label;
  }
  const address = [];
  if (street !== undefined) address.push(street);
  if (addressNumber !== undefined) address.push(addressNumber);
  if (postalCode !== undefined) address.push(postalCode);
  if (municipality !== undefined) address.push(municipality);

  return address.join(", ");
};

// Component: RoutingMenuInput - Input for routing with debounced state and events
const RoutingMenuInput = ({
  marker,
  idx,
  handleValueChangeRef,
  handleExitInputBubble,
}) => {
  const context = useContext(AppContext);
  const defaultValue = formatAddress(marker);
  const [value, setValue] = useState(defaultValue);
  const debouncedValue = useDebounce(value, 1000);

  useEffect(() => {
    if (debouncedValue !== defaultValue && handleValueChangeRef.current) {
      console.debug(debouncedValue, "debounced value");
      handleValueChangeRef.current(
        debouncedValue.trim(),
        context.viewportCenter,
        idx
      );
    }
  }, [
    debouncedValue,
    defaultValue,
    handleValueChangeRef,
    context.viewportCenter,
    idx,
  ]);

  const handleExitInput = (e) => {
    const { key } = e;
    if (key !== "Escape") {
      return;
    }
    setValue(defaultValue);
    handleExitInputBubble();
  };

  return (
    <input
      className="w-full p-1 mb-1 border border-gray-500 rounded-md"
      placeholder="Start typing, or click on the map"
      onChange={(e) => setValue(e.target.value)}
      onKeyUp={handleExitInput}
      value={value}
    />
  );
};

// Component: Inputs - Routing inputs
const Inputs = ({ setHasSuggestions }) => {
  const context = useContext(AppContext);
  let inputs = [...context.markers];
  const [suggestions, setSuggestions] = useState([]);
  const [focusedInputIdx, setFocusedInputIdx] = useState(-1);
  const isDirtyRef = useRef(false);

  // Geocode value (address) to retrieve suggestions
  const searchByText = async (value, biasPosition) => {
    if (value.trim() === "") {
      return;
    }
    console.debug(
      "SearchByText: %s w/ bias %s",
      value,
      JSON.stringify(biasPosition)
    );
    try {
      const res = await Geo.searchByText(value, {
        biasPosition: biasPosition,
        maxResults: 5,
      });
      console.debug(res, "results from searchByText");
      if (res.length > 0) {
        setSuggestions(res);
      } else {
        setSuggestions(["No result found for this address."]);
      }
      setHasSuggestions(true);
    } catch (error) {
      console.error(error);
    }
  };

  // Handler to updates of the input
  const handleValueChange = (value, biasPosition, idx) => {
    searchByText(value, biasPosition);
    setFocusedInputIdx(idx);
    if (isDirtyRef.current === false) {
      isDirtyRef.current = true;
    }
  };
  // Ref for the handler so it persists between renders
  const handleValueChangeRef = useRef(handleValueChange);

  // Handler to suggestion selection
  const handleResultClick = (result) => {
    console.debug("Result chosen", formatAddress(result));
    console.debug("Should update input w index", focusedInputIdx);
    setSuggestions([]);
    setHasSuggestions(false);
    let force;
    if (!context.isRouting && context.markers.length === 0) {
      force = true;
    } else if (!context.isRouting && context.markers.length === 1) {
      force = true;
    } else if (context.markers.length === 2) {
      force = true;
    }
    Hub.dispatch(
      "Markers",
      {
        event: "setMarker",
        data: {
          idx: focusedInputIdx,
          marker: result,
          geocode: false,
          force: force,
        },
      },
      "routingMenu"
    );
  };

  if (inputs[0] === undefined && !context.isRouting) {
    // Inputs are mapped to the markers, if there's no marker show at least one input
    inputs[0] = {};
  } else if (context.isRouting && inputs.length < 2) {
    // Else, if we are in routing mode and there's only one marker, let's assume it's a destination and prepend an empty field
    const newInputs = [...inputs].slice();
    newInputs.unshift({});
    inputs = newInputs;
  }

  return (
    <>
      <div className="flex justify-start flex-row items-center">
        <div className={inputs.length === 1 ? "w-full" : "w-11/12"}>
          {inputs.map((marker, idx) => (
            <div
              key={JSON.stringify(marker?.geometry) + isDirtyRef.current || 0}
            >
              <RoutingMenuInput
                marker={isDirtyRef.current || context.isRouting ? marker : {}}
                idx={idx}
                handleValueChangeRef={handleValueChangeRef}
                handleExitInputBubble={() => {
                  setSuggestions([]);
                  setHasSuggestions(false);
                }}
              />
            </div>
          ))}
        </div>
        {inputs.length === 2 ? (
          <div
            className="w-1/12 flex justify-center items-center cursor-pointer"
            onClick={() => {
              Hub.dispatch("Markers", { event: "swapMarkers" });
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className={`fill-current text-black`}
            >
              <path d="M18 9v-3c-1 0-3.308-.188-4.506 2.216l-4.218 8.461c-1.015 2.036-3.094 3.323-5.37 3.323h-3.906v-2h3.906c1.517 0 2.903-.858 3.58-2.216l4.218-8.461c1.356-2.721 3.674-3.323 6.296-3.323v-3l6 4-6 4zm-9.463 1.324l1.117-2.242c-1.235-2.479-2.899-4.082-5.748-4.082h-3.906v2h3.906c2.872 0 3.644 2.343 4.631 4.324zm15.463 8.676l-6-4v3c-3.78 0-4.019-1.238-5.556-4.322l-1.118 2.241c1.021 2.049 2.1 4.081 6.674 4.081v3l6-4z" />
            </svg>
          </div>
        ) : null}
      </div>
      {inputs.length === 1 &&
      Object.keys(inputs[0]).length > 0 &&
      suggestions.length === 0 &&
      !context.isRouting &&
      isDirtyRef.current ? (
        <div className="flex justify-center">
          <Button
            title="Start Routing"
            className="p-1 flex items-center cursor-pointer border border-yellow-500 bg-yellow-500 rounded-md hover:bg-yellow-600 drop-shadow-md filter"
            onPress={() => Hub.dispatch("Routing", { event: "startRouting" })}
          >
            <span className="text-white">Directions</span>
            <NavigationIcon width="24" height="24" className="text-white" />
          </Button>
        </div>
      ) : null}
      {suggestions.length === 0
        ? null
        : suggestions.map((result, idx) => (
            <div
              key={idx}
              className="cursor-pointer border-b-2 border-gray-500"
              onClick={() => handleResultClick(result)}
            >
              <span className="text-sm">{formatAddress(result)}</span>
            </div>
          ))}
    </>
  );
};

export default Inputs;
