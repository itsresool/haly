import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { styled } from "./theme";
import { MdArrowDropDown } from "react-icons/all";
import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const StyledTrigger = styled(DropdownMenu.Trigger, {
    height: "32px",
    position: "absolute",
    top: "$600",
    right: "$800",
    display: "flex",
    alignItems: "center",
    gap: "$400",
    padding: "$100",
    borderRadius: "23px",
    border: 0,
    color: "$white",
    backgroundColor: "$black700",
    fontSize: "$300",
    fontWeight: 700,
    userSelect: "none",

    '&:hover, &:focus, &[data-state="open"]': {
        backgroundColor: "$black700Hover",
        cursor: "pointer",
    },
});

const StyledTriggerSpan = styled("span", {
    maxWidth: "$userDropdownTriggerSpanMinWidth",
    marginInlineStart: "$500",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
});

const StyledArrorDown = styled(MdArrowDropDown, {
    height: "28px",
    width: "28px",
    marginInlineEnd: "$200",
});

const StyledDropdownContent = styled(DropdownMenu.Content, {
    width: "$userDropdownMinWidth",
    padding: "$300",
    color: "$white",
    backgroundColor: "$black700Hover",
    fontSize: "$200",
    marginTop: "$400",
    borderRadius: "4px",
});

const StyledDropdownItem = styled(DropdownMenu.Item, {
    padding: "$500",
    cursor: "default",
    "&:hover": {
        backgroundColor: "$black700HoverOfAHover",
        outline: 0,
    },
    a: {
        color: "unset",
        textDecoration: "none",
        cursor: "unset",
    },
});

const StyledSeparator = styled(DropdownMenu.Separator, {
    height: "1px",
    backgroundColor: "$black700HoverOfAHover",
});

function UserDropdown() {
    const auth = useAuth();
    const navigate = useNavigate();
    const user = useContext(UserContext);

    const profileHref = `/me`;
    const appSettingsHref = `${profileHref}/appsettings`;

    return (
        <DropdownMenu.Root>
            <StyledTrigger>
                <StyledTriggerSpan>{user.name}</StyledTriggerSpan>
                <AccessibleIcon label="User actions">
                    <StyledArrorDown />
                </AccessibleIcon>
            </StyledTrigger>

            <StyledDropdownContent>
                <StyledDropdownItem onClick={() => navigate(profileHref)}>Profile</StyledDropdownItem>
                <StyledDropdownItem onClick={() => navigate(appSettingsHref)}>Haly Settings</StyledDropdownItem>
                <StyledSeparator />
                <StyledDropdownItem onClick={() => auth.removeUser()}>Log out</StyledDropdownItem>
            </StyledDropdownContent>
        </DropdownMenu.Root>
    );
}

export default UserDropdown;
