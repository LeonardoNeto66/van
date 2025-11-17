*** Settings ***
Library    SeleniumLibrary 
Documentation    Testes automatizados para remoção de vans
Test Setup       Abrir navegador para remover van
Test Teardown    Fechar navegador 
Resource    resources.robot 

*** Test Cases ***

CT02: Remover van com sucesso
    [Documentation]   
    [Tags]    remover    vans
    
    Acessar página de vans
    Clicar em remover van
   
   