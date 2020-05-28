import React from "react";
import Grid from "@material-ui/core/Grid";
import AccountCard from "./AccountCard";

const AccountsCardList = ({ accounts, updateOffice }) => {
    return (
        <Grid container spacing={4}>
            {
                accounts.map(item => (
                    <Grid key={item.id} item ld={3} md={4} sm={6} xs={12}>
                        <AccountCard
                            currency={item.currencyValue}
                            total={item.total}
                            accountName={item.typeName}
                            id={item.id}
                            updateOffice={updateOffice}
                            accountDescription={item.description}
                        />
                    </Grid>
                ))
            }
        </Grid>
    )
};

export default AccountsCardList;
