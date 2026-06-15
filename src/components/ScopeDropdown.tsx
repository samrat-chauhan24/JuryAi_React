import { useLegalStore } from "../store/useLegalStore";
import type { Jurisdiction } from "../store/useLegalStore";

import { Dropdown } from "./Dropdown";

// THEME
import { spacing } from "../theme";

export const ScopeDropdown = () => {
  const {
    jurisdiction,
    setJurisdiction,
    setCountries,
  } = useLegalStore();

  const handleSelect = (value: string) => {
    setJurisdiction(value as Jurisdiction);
    setCountries([]);
  };

  return (
    <div
      style={{
        paddingLeft: spacing.md,
        paddingRight: spacing.md,
        marginBottom: spacing.sm,
      }}
    >
      <Dropdown
        options={[
          "global",
          "specific country",
          "comparison",
        ]}
        selected={jurisdiction}
        onSelect={handleSelect}
      />
    </div>
  );
};