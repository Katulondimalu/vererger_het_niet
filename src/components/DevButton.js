import { DevControlledButton } from '../assets/styles/ButtonStyle.style';
import { useIsDevelopment } from '../utils/use-is-development';

export let DevButton = (props) => {
  let is_dev = useIsDevelopment();
  if (!is_dev) return null;
  return <DevControlledButton {...props} />;
};
