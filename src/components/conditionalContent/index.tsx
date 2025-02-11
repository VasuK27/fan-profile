import MainLoading from "components/mainLoading";
import { ConditionalContentProps } from "interfaces/custom";
import { TextAndLoading } from "views/driver/index.style";

const ConditionalContent = <T,>({
  isLoading,
  data,
  noDataMessage,
  renderItem,
}: ConditionalContentProps<T>) => {
  if (isLoading) {
    return (
      <TextAndLoading>
        <MainLoading />
      </TextAndLoading>
    );
  }

  if (data.length === 0) {
    return <TextAndLoading>{noDataMessage}</TextAndLoading>;
  }

  return <>{data.map(renderItem)}</>;
};

export default ConditionalContent;
