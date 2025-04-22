import React from 'react';
import { Flex, Button, Menu, MenuButton, MenuList, MenuItem, Avatar, Text, Box } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const Header = () => {
  return (
    <Flex
      as="header"
      width="full"
      align="center"
      justify="space-between"
      px={4}
      py={3}
      bg="white"
      boxShadow="sm"
      position="sticky"
      top="0"
      zIndex="docked"
    >
      <Text fontSize="xl" fontWeight="bold" color="teal.500">
        Sentral Dashboard
      </Text>

      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          <Flex align="center">
            <Avatar size="sm" name="User" mr={2} />
            <Text>User</Text>
          </Flex>
        </MenuButton>
        <MenuList>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default Header;
