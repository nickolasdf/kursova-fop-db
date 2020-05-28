import React from 'react';

import UsersTable from '../../components/Users/UsersTable';
import MainLayout from '../../components/MainLayout';
import MainTitle from '../../components/MainTitle';
import InviteUserButton from '../../components/Users/InviteUserButton';
import './index.scss';

const Users = () => {
    return (
        <MainLayout>
            <div className="users_wrapper">
                <div className="users_nav_block">
                    <MainTitle title="Сотрудники"/>
                    <InviteUserButton/>
                </div>
                <section className="section_item">
                    <UsersTable/>
                </section>
            </div>
        </MainLayout>
    );
};

export default Users;
