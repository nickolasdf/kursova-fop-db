import React, { Fragment, memo, useState } from 'react';
import Logo from '../Icons/Logo';
import clsx from 'clsx';
import history from '../../history';
import { Collapse, createStyles, Drawer, List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import './style.scss';
import { Menu } from '@material-ui/icons';
import {
    CalendarIcon,
    CandidatesIcon,
    CaretIcon,
    CustomerIcon,
    DashboardIcon,
    EmployeesIcon,
    HumanResourcesIcon,
    InvoiceIcon,
    InvoiceListIcon,
    ProfileIcon,
    ProjectsIcon,
    ReportsIcon,
    SettingsIcon,
    VacanciesIcon,
    WalletIcon
} from '../Icons';
import SidebarHostingIcon from '../Icons/SidebarHostingIcon';
import ServerIcon from '../Icons/ServerIcon';

const drawerWidth = 260;
const Profile = 'Профиль';
const Users = 'Сотрудники';
const Vacancies = 'Вакансии';
const Candidates = 'Кандидаты';
const Projects = 'Проекты';
const Dashboard = 'Dashboard';
const Customers = 'Контрагенты';
const Settings = 'Настройки';
const RivoWallet = 'Rivo Wallet';
const Reports = 'Отчеты';
const HumanResources = 'Human Resources';
const Hosting = 'Хостинг';
const Servers = 'Сервера';
const Invoice = 'Инвоис';
const Calendar = 'Календарь';
const Invoices = 'Инвойсы';

const getFirstDomain = path => {
    return path.split('/')[1];
};

const useStyles = makeStyles(theme =>
    createStyles({
        activeLink: {
            backgroundColor: '#F6F6F4',
            '&:before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '3px',
                backgroundColor: '#FFD63C'
            }
        },
        openLink: {
            backgroundColor: '#F7F7F6'
        },
        sublinkList: {
            backgroundColor: '#FAFAF9'
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            })
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        hide: {
            display: 'none'
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap'
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        drawerClose: {
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            overflowX: 'hidden',
            width: 60
        },
        content: {
            width: 'calc(100% - 60px)',
            marginLeft: '60px',
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            })
        },
        contentShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        caretOpen: {
            transform: 'rotate(180deg)',
            transition: theme.transitions.create(['transform'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        caretClose: {
            transform: 'rotate(0)',
            transition: theme.transitions.create(['transform'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            })
        }
    })
);

export const SideBar = props => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const links = [
        { name: Profile, link: '/profile' },
        {
            name: RivoWallet,
            subLinks: [
                { name: Dashboard, link: '/dashboard' },
                { name: Reports, link: '#' },
                { name: Settings, link: '/settings' }
            ]
        },
        { name: Projects, link: '/project' },
        { name: Customers, link: '/customers' },
        {
            name: Hosting,
            subLinks: [
                { name: Hosting, link: '/hostings' },
                { name: Servers, link: '/servers' }
            ]
        },
        { name: Users, link: '/users' },
        {
            name: HumanResources,
            subLinks: [
                { name: Vacancies, link: '/vacancies' },
                { name: Candidates, link: '/candidates' }
            ]
        },
        {
            name: Invoice,
            subLinks: [
                { name: Invoice, link: '/invoice' },
                { name: Invoices, link: '/invoices' },
                { name: Settings, link: '/invoice-settings' },
                { name: Customers, link: '/invoice-customers' }
            ]
        },
        {
            name: Calendar,
            link: '/calendar'
        }
    ];

    const isLinksContainPath = links => {
        let result = false;
        links.forEach(item => {
            if (item.link === `/${getFirstDomain(history.location.pathname)}`) {
                result = true;
            }
        });
        return result;
    };

    const [openedSubLinks, setOpenedSubLinks] = useState(
        links.map(item => {
            if (item.subLinks && item.subLinks.length > 0) {
                return {
                    ...item,
                    isOpen: isLinksContainPath(item.subLinks)
                };
            } else {
                return {
                    ...item,
                    isOpen: false
                };
            }
        })
    );

    const checkLinkActive = (item) => {
        const isPathCorrect = item.link === `/${getFirstDomain(history.location.pathname)}`;
        if (open) {
            return isPathCorrect;
        } else {
            if (item.subLinks) {
                return isLinksContainPath(item.subLinks);
            } else {
                return isPathCorrect;
            }
        }
    };

    const handleSubLinks = linkName => {
        const result = openedSubLinks.map(item => {
            return item.name === linkName
                ? { ...item, isOpen: !item.isOpen }
                : item;
        });
        setOpenedSubLinks(result);
    };

    const handleLink = linkItem => {
        if (linkItem.subLinks && linkItem.subLinks.length > 0) {
            handleSubLinks(linkItem.name);
        } else {
            history.push(linkItem.link);
        }
    };

    const renderIcon = name => {
        switch (name) {
            case Profile:
                return <ProfileIcon/>;
            case Users:
                return <EmployeesIcon/>;
            case Vacancies:
                return <VacanciesIcon/>;
            case Candidates:
                return <CandidatesIcon/>;
            case Projects:
                return <ProjectsIcon/>;
            case Dashboard:
                return <DashboardIcon/>;
            case Customers:
                return <CustomerIcon/>;
            case Settings:
                return <SettingsIcon/>;
            case RivoWallet:
                return <WalletIcon/>;
            case HumanResources:
                return <HumanResourcesIcon/>;
            case Reports:
                return <ReportsIcon/>;
            case Hosting:
                return <SidebarHostingIcon/>;
            case Servers:
                return <ServerIcon/>;
            case Invoice:
                return <InvoiceIcon/>;
            case Invoices:
                return <InvoiceListIcon/>;
            case Calendar:
                return <CalendarIcon/>;
            default:
                return 'No icon for this case';
        }
    };

    const onMouseEnter = () => {
        setOpen(true);
    };

    const onMouseLeave = () => {
        setOpen(false);
    };

    return (
        <div className="side_bar">
            <Drawer
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open
                    })
                }}
            >
                <div className="header__logo">
                    <Logo/>
                    <Menu className="menu-icon"/>
                </div>
                <List disablePadding={true}>
                    {openedSubLinks.map(item => (
                        <Fragment key={item.name}>
                            <ListItem
                                className={clsx({
                                    ['sidebar-link']: true,
                                    [classes.activeLink]: checkLinkActive(item),
                                    [classes.openLink]: item.isOpen
                                })}
                                onClick={() => handleLink(item)}
                                key={item.name}
                                button={!item.subLinks}
                                disableGutters={true}
                            >
                                <span className="link_icon">
                                    {renderIcon(item.name)}
                                </span>
                                <div className="link_text_wrapper">
                                    <ListItemText disableTypography={true} primary={item.name}/>
                                    {
                                        item.subLinks && item.subLinks.length > 0 ?
                                            <span
                                                className={clsx(item.isOpen ? classes.caretOpen : classes.caretClose)}
                                            >
                                                <CaretIcon/>
                                            </span> : null

                                    }
                                </div>
                            </ListItem>
                            {item.subLinks &&
                            item.subLinks.length > 0 &&
                            item.subLinks.map(j => {
                                return (
                                    <Collapse
                                        key={j.name}
                                        in={open && item.isOpen}
                                        timeout="auto"
                                        unmountOnExit
                                    >
                                        <List
                                            component="div"
                                            disablePadding
                                            className={classes.sublinkList}
                                        >
                                            <ListItem
                                                className={clsx('sidebar-link', checkLinkActive(j) ? classes.activeLink : null)}
                                                button
                                                onClick={() => {
                                                    history.push(j.link);
                                                }}
                                            >
                                                <span className="link_icon">
                                                    {renderIcon(j.name)}
                                                </span>
                                                <div className="link_text_wrapper">
                                                    <ListItemText disableTypography={true} primary={j.name}/>
                                                </div>
                                            </ListItem>
                                        </List>
                                    </Collapse>
                                );
                            })}
                        </Fragment>
                    ))}
                </List>
            </Drawer>
            <main className={clsx(classes.content, { [classes.contentShift]: open })}>{props.children}</main>
        </div>
    );
};

export default memo(SideBar);
