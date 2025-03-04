import Button from '../shared/buttons'
export default {
    title: 'shared/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
      disabled: { control: 'boolean' },
      children: { control: 'text' },
      primary: { control: 'boolean' },
      secondary: { control: 'boolean' },
    },
    args: {
      disabled: false,
      children: 'Press me!',
      primary: false,
      secondary: false
    }
  }
  export const Default = (args) => <Button {...args} />;
  export const Primary = (args) => <Button {...args} />;

  Primary.args = {
    primary: true,
    children: 'Primary button',
  }
  export const Secondary = (args) => <Button {...args} />;

Secondary.args = {
  secondary: true,
  children: 'Secondary button',
}
export const Disabled = (args) => <Button {...args} />;

Disabled.args = {
  disabled: true,
  children: 'Disabled button',
}
