const Topbar = ({ children = null }) => {
  return (
    <div
      style={{
        top: 0,
        position: 'sticky',
        zIndex: 10,
        backgroundColor: 'var(--background-color)',
        color: 'black',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        padding: 8,
      }}
    >
      <div></div>
      {children}
    </div>
  );
};

export default Topbar;
