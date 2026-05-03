export const ItemPopupContent = ({ title, description, children }) => {
  return (
    <div className="flex flex-col gap-md w-full">
      <div className="flex flex-row justify-between items-center gap-md w-full">
        <h3 className="font-heading text-foreground text-lg sm:text-xl leading-none line-clamp-1 w-[50%]">
          {title}
        </h3>
        {children}
      </div>
      {description && <p>{description}</p>}
    </div>
  );
};
