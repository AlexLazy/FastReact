import React, { FC, FormEvent, ChangeEvent, useState, useEffect } from 'react';
import { Link, match } from 'react-router-dom';

import { FormComponentProps } from 'antd/lib/form/Form';
import {
  Form,
  Input,
  InputNumber,
  Radio,
  Upload,
  Button,
  Icon,
  Card,
  Modal
} from 'antd';
import { UploadFile, UploadChangeParam } from 'antd/lib/upload/interface';
import MaskedInput from 'antd-mask-input';

import uuid from 'uuid/v4';
import useLocalStorage from 'react-use-localstorage';

import letters from '../../letterAssociations';
import {
  REQUIRED_FIELD,
  MODAL_ADD_SUCCES,
  MODAL_EDIT_SUCCES
} from '../../constants';

interface RouteParams {
  id: string;
}

interface FlyingVehicleFormProps extends FormComponentProps {
  match?: match<RouteParams>;
}

const FlyingVehicleForm: FC<FlyingVehicleFormProps> = ({ form, match }) => {
  const [avatar, setAvatar] = useState<UploadFile[] | []>([]);
  const [vehicle, setVehicle] = useState<UploadFile[] | []>([]);
  const [proposals, setProposals] = useLocalStorage('proposals', '');
  const { getFieldDecorator } = form;
  const id = (match && match.params.id) || null;

  const clearForm = (): void => {
    form.resetFields();
    setAvatar([]);
    setVehicle([]);
  };

  const handleCyrToLat = (fieldName: string) => (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const normalizedString = e.target.value.normalize();
    const str = [...normalizedString];

    str.forEach((character, i) => {
      const isUpperCase = character === character.toUpperCase();
      const char = character.toLowerCase();

      (letters[char] === '' || letters[char]) &&
        (isUpperCase
          ? (str[i] =
              letters[char].charAt(0).toUpperCase() + letters[char].slice(1))
          : (str[i] = letters[char]));
    });

    form.setFieldsValue({ [fieldName]: str.join('') });
  };

  const handleChangeAvatar = (info: UploadChangeParam) =>
    setAvatar(info.fileList);

  const handleChangeVehicle = (info: UploadChangeParam) =>
    setVehicle(info.fileList);

  const handleSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();

    form.validateFields((err, values) => {
      if (!err) {
        const proposal = {
          [id ? id : uuid()]: values
        };

        const newProposals = proposals
          ? { ...JSON.parse(proposals), ...proposal }
          : proposal;

        setProposals(JSON.stringify(newProposals));

        Modal.success(id ? MODAL_EDIT_SUCCES : MODAL_ADD_SUCCES);

        clearForm();
      }
    });
  };

  useEffect(() => {
    if (id) {
      const proposal = JSON.parse(proposals)[id];

      for (let key in form.getFieldsValue()) {
        switch (key) {
          case 'avatar':
            setAvatar(proposal[key].fileList);
            form.setFieldsValue({ [key]: proposal[key] });
            break;
          case 'photo':
            setVehicle(proposal[key].fileList);
            form.setFieldsValue({ [key]: proposal[key] });
            break;
          default:
            form.setFieldsValue({ [key]: proposal[key] });
        }
      }
    }
  }, []);

  return (
    <section
      style={{
        display: 'flex',
        minHeight: 'calc(100% - 64px)',
        marginTop: 30,
        marginBottom: 30
      }}
    >
      <Card
        title={
          <p>
            <Link to='/proposals'>
              <Button type='primary' icon='left' />
            </Link>
            &nbsp;Форма на рассмотрение летательного аппарата
          </p>
        }
        style={{ width: 600, margin: 'auto' }}
      >
        <Form onSubmit={handleSubmit}>
          <Form.Item label='Имя'>
            {getFieldDecorator('username', {
              rules: [REQUIRED_FIELD]
            })(<Input onChange={handleCyrToLat('usernameLat')} />)}
          </Form.Item>
          <Form.Item label='Имя латиницей'>
            {getFieldDecorator('usernameLat', {})(<Input disabled={true} />)}
          </Form.Item>
          <Form.Item label='Фамилия'>
            {getFieldDecorator('lastname', {
              rules: [REQUIRED_FIELD]
            })(<Input onChange={handleCyrToLat('lastnameLat')} />)}
          </Form.Item>
          <Form.Item label='Фамилия латиницей'>
            {getFieldDecorator('lastnameLat', {})(<Input disabled={true} />)}
          </Form.Item>
          <Form.Item label='E-mail'>
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'Невалидная информация'
                },
                REQUIRED_FIELD
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label='Номер телефона'>
            {getFieldDecorator('phone', {
              rules: [REQUIRED_FIELD]
            })(<MaskedInput mask='+7 (111) 111-11-11' />)}
          </Form.Item>
          <Form.Item label='Личная фотография'>
            {getFieldDecorator('avatar', {
              rules: [REQUIRED_FIELD]
            })(
              <Upload
                listType='picture-card'
                action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                fileList={avatar}
                onChange={handleChangeAvatar}
              >
                {avatar.length < 1 && (
                  <div>
                    <Icon type='plus' />
                    <div className='ant-upload-text'>Upload</div>
                  </div>
                )}
              </Upload>
            )}
          </Form.Item>
          <Form.Item label='Название летательного средства'>
            {getFieldDecorator('vehicleName', {
              rules: [REQUIRED_FIELD]
            })(<Input />)}
          </Form.Item>
          <Form.Item label='Объем двигателя'>
            {getFieldDecorator('capacity', {
              rules: [REQUIRED_FIELD]
            })(<InputNumber min={0} formatter={value => `${value}л`} />)}
          </Form.Item>
          <Form.Item label='Возможность вернуться из черной дыры'>
            {getFieldDecorator('isComeback', { initialValue: 'no' })(
              <Radio.Group>
                <Radio.Button value='yes'>Да</Radio.Button>
                <Radio.Button value='no'>Нет</Radio.Button>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item
            label='Вероятность вернуться из черной дыры'
            style={{
              display:
                form.getFieldValue('isComeback') === 'yes' ? 'block' : 'none'
            }}
          >
            {getFieldDecorator('comeback', {
              rules: [REQUIRED_FIELD],
              initialValue: 0
            })(
              <InputNumber min={0} max={100} formatter={value => `${value}%`} />
            )}
          </Form.Item>
          <Form.Item label='Наличие записывающих средств, позволяющих передавать данные из черной дыры'>
            {getFieldDecorator('recording', { initialValue: 'no' })(
              <Radio.Group>
                <Radio.Button value='yes'>Да</Radio.Button>
                <Radio.Button value='no'>Нет</Radio.Button>
                <Radio.Button value='partial'>Частично</Radio.Button>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item
            label='Скорость передачи информации'
            style={{
              display:
                form.getFieldValue('recording') === 'no' ? 'none' : 'block'
            }}
          >
            {getFieldDecorator('recordingSpeed', {
              rules: [REQUIRED_FIELD],
              initialValue: 0
            })(<InputNumber min={0} formatter={value => `${value}Гб/с`} />)}
          </Form.Item>
          <Form.Item label='Фото летательного транспорта'>
            {getFieldDecorator('photo', {
              rules: [REQUIRED_FIELD]
            })(
              <Upload
                listType='picture'
                action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                fileList={vehicle}
                onChange={handleChangeVehicle}
              >
                <Button>
                  <Icon type='upload' /> Загрузить фото
                </Button>
              </Upload>
            )}
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              {id ? 'Сохранить' : 'Отправить заявку'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </section>
  );
};

export default Form.create({
  name: 'flying_vehicle'
})(FlyingVehicleForm);
