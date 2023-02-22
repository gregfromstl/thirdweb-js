import { IconButton } from "../../../components/buttons";
import { Theme, fontSize } from "../../../design-system";
import { iconSize } from "../../../design-system";
import styled from "@emotion/styled";
import { Title } from "@radix-ui/react-dialog";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

export const ModalTitle = styled(Title)<{ theme?: Theme }>`
  margin: 0;
  font-weight: 500;
  font-size: ${fontSize.lg};
  color: ${(p) => p.theme.text.neutral};
`;

export const ModalDescription = styled.p<{ theme?: Theme }>`
  all: unset;
  display: block;
  font-size: ${fontSize.md};
  color: ${(p) => p.theme.text.secondary};
  line-height: 1.5;
`;

export const BackButton: React.FC<{
  onClick: () => void;
  style?: React.CSSProperties;
}> = (props) => {
  return (
    <IconButton variant="secondary" onClick={props.onClick} style={props.style}>
      <ChevronLeftIcon
        style={{
          width: iconSize.md,
          height: iconSize.md,
        }}
      />
    </IconButton>
  );
};

export const HelperLink = styled.a<{ theme?: Theme }>`
  color: ${(p) => p.theme.link.primary};
  font-size: ${fontSize.sm};
  text-decoration: none;
`;
