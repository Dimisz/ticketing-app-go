interface AlertProps {
  alertClassName: string;
  message: string;
}
export default function Alert({ alertClassName, message }: AlertProps) {
  return (
    <div className={`alert ${alertClassName}`} role="alert">
      {message}
    </div>
  );
}
